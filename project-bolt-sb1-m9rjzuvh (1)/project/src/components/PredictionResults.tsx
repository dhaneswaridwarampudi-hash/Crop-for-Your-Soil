import { getCropInfo, getCropDisplayName, getCropEmoji } from '@/ml/cropInfo';
import type { PredictionResult } from '@/ml/knnClassifier';
import { RadarChart } from './RadarChart';
import { getNormalizedFeatures, getCropProfile } from '@/ml/knnClassifier';
import type { SoilInput } from '@/ml/cropDataset';
import { CheckCircle2, TrendingUp, Sprout, Calendar, Thermometer, Droplets, Layers, Lightbulb } from 'lucide-react';

interface PredictionResultsProps {
  result: PredictionResult;
  input: SoilInput;
}

export function PredictionResults({ result, input }: PredictionResultsProps) {
  const info = getCropInfo(result.crop);
  const inputFeatures = getNormalizedFeatures(input);
  const cropProfile = getCropProfile(result.crop);
  const confidencePercent = Math.round(result.confidence * 100);

  return (
    <div className="space-y-6 animate-[fadeInUp_0.5s_ease-out]">
      {/* Main recommendation card */}
      <div className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl shadow-lg border border-emerald-200/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-2 text-emerald-700 mb-4">
            <Sprout className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Recommended Crop</span>
          </div>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-6xl leading-none">{getCropEmoji(result.crop)}</div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{getCropDisplayName(result.crop)}</h3>
                {info && (
                  <span className="inline-block mt-1 px-3 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                    {info.category}
                  </span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-4xl font-bold text-emerald-600 tabular-nums">{confidencePercent}%</div>
              <div className="text-xs text-gray-500 font-medium">Confidence</div>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="mt-5">
            <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${confidencePercent}%` }}
              />
            </div>
          </div>

          {info && (
            <p className="mt-5 text-gray-600 text-sm leading-relaxed">{info.description}</p>
          )}
        </div>
      </div>

      {/* Crop details grid */}
      {info && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <DetailCard icon={<Calendar className="w-4 h-4" />} label="Season" value={info.growingSeason} />
          <DetailCard icon={<Thermometer className="w-4 h-4" />} label="Temperature" value={info.optimalTemp} />
          <DetailCard icon={<Droplets className="w-4 h-4" />} label="Water Needs" value={info.waterNeeds} />
          <DetailCard icon={<Layers className="w-4 h-4" />} label="Soil Type" value={info.soilType} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            Soil Profile Comparison
          </h4>
          <p className="text-xs text-gray-500 mb-4">Your soil vs. ideal conditions for {getCropDisplayName(result.crop)}</p>
          <RadarChart inputFeatures={inputFeatures} cropProfile={cropProfile} cropName={getCropDisplayName(result.crop)} />
        </div>

        {/* Growing tips */}
        {info && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Growing Tips
            </h4>
            <ul className="space-y-3">
              {info.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Market Value</span>
                <span className="text-sm font-bold text-gray-900">{info.marketValue}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alternative crops */}
      {result.alternatives.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h4 className="text-sm font-bold text-gray-900 mb-4">Alternative Crops</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {result.alternatives.map((alt, i) => {
              const altInfo = getCropInfo(alt.crop);
              const altPercent = Math.round(alt.confidence * 100);
              return (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getCropEmoji(alt.crop)}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{getCropDisplayName(alt.crop)}</div>
                      {altInfo && <div className="text-xs text-gray-400">{altInfo.category}</div>}
                    </div>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-700"
                      style={{ width: `${altPercent}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1.5 font-medium">{altPercent}% match</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-center gap-1.5 text-gray-400 mb-1.5">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-sm font-bold text-gray-900">{value}</div>
    </div>
  );
}
