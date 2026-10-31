import { FEATURE_KEYS, FEATURE_LABELS, FEATURE_UNITS, FEATURE_RANGES, type SoilInput } from '@/ml/cropDataset';

interface SoilInputFormProps {
  values: SoilInput;
  onChange: (key: keyof SoilInput, value: number) => void;
  onPredict: () => void;
  onReset: () => void;
  isLoading: boolean;
}

const ICONS: Record<keyof SoilInput, string> = {
  N: '🧪',
  P: '⚗️',
  K: '🧬',
  temperature: '🌡️',
  humidity: '💧',
  ph: '📊',
  rainfall: '🌧️',
};

export function SoilInputForm({ values, onChange, onPredict, onReset, isLoading }: SoilInputFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Soil & Climate Parameters</h2>
          <p className="text-sm text-gray-500 mt-1">Enter your field's measurements below</p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-gray-400 hover:text-gray-700 transition-colors font-medium"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {FEATURE_KEYS.map((key) => {
          const range = FEATURE_RANGES[key];
          return (
            <div key={key} className="group">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-base">{ICONS[key]}</span>
                  {FEATURE_LABELS[key]}
                </label>
                <span className="text-sm font-bold text-emerald-600 tabular-nums">
                  {values[key].toFixed(key === 'temperature' || key === 'humidity' || key === 'ph' ? 1 : 0)}
                  <span className="text-xs text-gray-400 ml-1 font-normal">{FEATURE_UNITS[key]}</span>
                </span>
              </div>
              <input
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={values[key]}
                onChange={(e) => onChange(key, parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-600 transition-all
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-600
                  [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                  [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-emerald-600 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-400">{range.min}</span>
                <span className="text-xs text-gray-400">{range.max}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onPredict}
        disabled={isLoading}
        className="w-full mt-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-base
          shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all duration-300
          hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 disabled:cursor-not-allowed
          active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analyzing...
          </>
        ) : (
          'Recommend Best Crops'
        )}
      </button>
    </div>
  );
}
