import { useState, useEffect, useCallback } from 'react';
import { SoilInputForm } from '@/components/SoilInputForm';
import { PredictionResults } from '@/components/PredictionResults';
import { HistoryPanel } from '@/components/HistoryPanel';
import { predictCrop } from '@/ml/knnClassifier';
import { FEATURE_RANGES, type SoilInput } from '@/ml/cropDataset';
import { supabase } from '@/lib/supabase';
import type { CropPredictionRow } from '@/lib/types';
import { Sprout, Leaf, Brain, TrendingUp, AlertCircle } from 'lucide-react';

function getDefaultInput(): SoilInput {
  const input = {} as SoilInput;
  for (const key of Object.keys(FEATURE_RANGES) as (keyof SoilInput)[]) {
    input[key] = FEATURE_RANGES[key].default;
  }
  return input;
}

export default function App() {
  const [input, setInput] = useState<SoilInput>(getDefaultInput);
  const [result, setResult] = useState<ReturnType<typeof predictCrop> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<CropPredictionRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    const { data, error } = await supabase
      .from('crop_predictions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      setError('Could not load prediction history.');
      return;
    }
    setHistory((data as CropPredictionRow[]) ?? []);
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleChange = (key: keyof SoilInput, value: number) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setInput(getDefaultInput());
    setResult(null);
    setError(null);
  };

  const handlePredict = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Run the ML classifier
      const prediction = predictCrop(input);
      setResult(prediction);

      // Save to Supabase
      const { error: insertError } = await supabase.from('crop_predictions').insert({
        nitrogen: input.N,
        phosphorus: input.P,
        potassium: input.K,
        temperature: input.temperature,
        humidity: input.humidity,
        ph: input.ph,
        rainfall: input.rainfall,
        recommended_crop: prediction.crop,
        confidence: prediction.confidence,
        alternatives: prediction.alternatives,
      });

      if (insertError) {
        setError('Prediction saved locally but could not sync to the cloud.');
      } else {
        await loadHistory();
      }
    } catch {
      setError('Something went wrong during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error: deleteError } = await supabase.from('crop_predictions').delete().eq('id', id);
    if (!deleteError) {
      setHistory((prev) => prev.filter((h) => h.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-gray-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">CropSense AI</h1>
              <p className="text-xs text-gray-400 leading-none mt-0.5">Smart Crop Recommendation</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <span className="flex items-center gap-1.5 text-gray-500">
              <Brain className="w-4 h-4 text-emerald-500" />
              KNN Classifier
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Leaf className="w-4 h-4 text-emerald-500" />
              23 Crop Types
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 to-transparent" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 left-10 w-48 h-48 bg-teal-200/20 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              AI-Powered Agriculture
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Find the Perfect Crop for Your Soil
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Enter your soil nutrients and climate data. Our machine learning model analyzes
              7 parameters using a K-Nearest Neighbors algorithm to recommend the best crops
              for your field.
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <StatCard value="7" label="Soil Parameters" />
            <StatCard value="23" label="Crop Types" />
            <StatCard value="115" label="Data Points" />
            <StatCard value="KNN" label="Algorithm" />
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {error && (
          <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Input form */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-6">
              <SoilInputForm
                values={input}
                onChange={handleChange}
                onPredict={handlePredict}
                onReset={handleReset}
                isLoading={isLoading}
              />
              <HistoryPanel history={history} onDelete={handleDelete} />
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-7 xl:col-span-8">
            {result ? (
              <PredictionResults result={result} input={input} />
            ) : (
              <div className="h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center max-w-md">
                  <div className="text-7xl mb-4 animate-float">🌱</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Analyze</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Adjust the soil and climate parameters on the left, then click
                    "Recommend Best Crops" to get your AI-powered crop recommendation.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      Instant Analysis
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Brain className="w-4 h-4" />
                      ML-Powered
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Sprout className="w-4 h-4 text-emerald-500" />
              <span>CropSense AI — Smart Crop Recommendation System</span>
            </div>
            <div className="text-xs text-gray-400">
              Powered by K-Nearest Neighbors ML Algorithm
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 p-4 text-center shadow-sm">
      <div className="text-2xl font-bold text-emerald-600">{value}</div>
      <div className="text-xs text-gray-500 font-medium mt-0.5">{label}</div>
    </div>
  );
}
