import { getCropDisplayName, getCropEmoji } from '@/ml/cropInfo';
import type { CropPredictionRow } from '@/lib/types';
import { History, Trash2 } from 'lucide-react';

interface HistoryPanelProps {
  history: CropPredictionRow[];
  onDelete: (id: string) => void;
}

export function HistoryPanel({ history, onDelete }: HistoryPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900">Recent Predictions</h3>
        <span className="ml-auto text-xs text-gray-400">{history.length} saved</span>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-3xl mb-2 opacity-40">🌱</div>
          <p className="text-sm text-gray-400">No predictions yet. Analyze your soil to get started!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1
          [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200">
          {history.map((entry) => {
            const percent = Math.round(entry.confidence * 100);
            return (
              <div
                key={entry.id}
                className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50/40 transition-colors border border-transparent hover:border-emerald-100"
              >
                <div className="text-2xl flex-shrink-0">{getCropEmoji(entry.recommended_crop)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-gray-900 truncate">
                      {getCropDisplayName(entry.recommended_crop)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 flex-shrink-0">{percent}%</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                    <span>N:{entry.nitrogen.toFixed(0)}</span>
                    <span>P:{entry.phosphorus.toFixed(0)}</span>
                    <span>K:{entry.potassium.toFixed(0)}</span>
                    <span>pH:{entry.ph.toFixed(1)}</span>
                    <span>{entry.temperature.toFixed(0)}°C</span>
                  </div>
                </div>
                <button
                  onClick={() => onDelete(entry.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-400 transition-all p-1"
                  aria-label="Delete prediction"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
