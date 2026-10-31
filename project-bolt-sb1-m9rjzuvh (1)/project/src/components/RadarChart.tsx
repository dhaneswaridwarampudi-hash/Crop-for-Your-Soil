import { FEATURE_KEYS, FEATURE_LABELS } from '@/ml/cropDataset';

interface RadarChartProps {
  inputFeatures: Record<string, number>;
  cropProfile?: Record<string, number>;
  cropName?: string;
}

/**
 * A custom SVG radar chart comparing the user's soil input
 * against the ideal profile of the recommended crop.
 */
export function RadarChart({ inputFeatures, cropProfile, cropName }: RadarChartProps) {
  const size = 320;
  const center = size / 2;
  const maxRadius = 120;
  const numAxes = FEATURE_KEYS.length;
  const angleStep = (Math.PI * 2) / numAxes;

  // Build polygon points for a given set of normalized values
  const buildPoints = (features: Record<string, number>): string => {
    return FEATURE_KEYS.map((key, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const value = features[key] ?? 0;
      const radius = value * maxRadius;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      return `${x},${y}`;
    }).join(' ');
  };

  const inputPoints = buildPoints(inputFeatures);
  const cropPoints = cropProfile ? buildPoints(cropProfile) : '';

  // Grid circles
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full">
        {/* Grid */}
        {gridLevels.map((level) => {
          const points = FEATURE_KEYS.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const r = level * maxRadius;
            return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
          }).join(' ');
          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="#d1d5db"
              strokeWidth={0.5}
              opacity={0.5}
            />
          );
        })}

        {/* Axis lines */}
        {FEATURE_KEYS.map((key, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + Math.cos(angle) * maxRadius;
          const y = center + Math.sin(angle) * maxRadius;
          return (
            <line
              key={key}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#d1d5db"
              strokeWidth={0.5}
              opacity={0.4}
            />
          );
        })}

        {/* Crop profile polygon */}
        {cropProfile && (
          <polygon
            points={cropPoints}
            fill="rgba(16, 185, 129, 0.15)"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
        )}

        {/* Input polygon */}
        <polygon
          points={inputPoints}
          fill="rgba(59, 130, 246, 0.2)"
          stroke="#3b82f6"
          strokeWidth={2}
        />

        {/* Data points for input */}
        {FEATURE_KEYS.map((key, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const value = inputFeatures[key] ?? 0;
          const r = value * maxRadius;
          return (
            <circle
              key={`pt-${key}`}
              cx={center + Math.cos(angle) * r}
              cy={center + Math.sin(angle) * r}
              r={3}
              fill="#3b82f6"
            />
          );
        })}

        {/* Axis labels */}
        {FEATURE_KEYS.map((key, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const labelRadius = maxRadius + 28;
          const x = center + Math.cos(angle) * labelRadius;
          const y = center + Math.sin(angle) * labelRadius;
          const label = FEATURE_LABELS[key].split(' ')[0];
          return (
            <text
              key={`label-${key}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="#6b7280"
              fontWeight={500}
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500" />
          <span className="text-xs text-gray-600">Your Soil</span>
        </div>
        {cropProfile && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-emerald-500" />
            <span className="text-xs text-gray-600">Ideal for {cropName}</span>
          </div>
        )}
      </div>
    </div>
  );
}
