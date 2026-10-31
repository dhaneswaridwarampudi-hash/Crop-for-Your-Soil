import { cropDataset, FEATURE_KEYS, type SoilInput, type CropSample } from './cropDataset';

export interface PredictionResult {
  crop: string;
  confidence: number;
  alternatives: { crop: string; confidence: number }[];
  neighbors: { label: string; distance: number }[];
}

// Min-max normalization ranges per feature, computed from the dataset.
// Precomputed so the classifier doesn't re-scan on every prediction.
const normalizationRanges: Record<string, { min: number; max: number }> = {};

function computeRanges() {
  for (const key of FEATURE_KEYS) {
    let min = Infinity;
    let max = -Infinity;
    for (const sample of cropDataset) {
      const val = sample[key];
      if (val < min) min = val;
      if (val > max) max = val;
    }
    normalizationRanges[key] = { min, max };
  }
}

computeRanges();

function normalize(value: number, key: string): number {
  const range = normalizationRanges[key];
  if (range.max === range.min) return 0;
  return (value - range.min) / (range.max - range.min);
}

function euclideanDistance(a: SoilInput, b: CropSample): number {
  let sum = 0;
  for (const key of FEATURE_KEYS) {
    const aNorm = normalize(a[key], key);
    const bNorm = normalize(b[key], key);
    const diff = aNorm - bNorm;
    sum += diff * diff;
  }
  return Math.sqrt(sum);
}

/**
 * K-Nearest Neighbors classifier for crop recommendation.
 * Uses k=7 neighbors and weighted distance voting.
 */
export function predictCrop(input: SoilInput, k: number = 7): PredictionResult {
  const distances = cropDataset.map((sample) => ({
    label: sample.label,
    distance: euclideanDistance(input, sample),
  }));

  distances.sort((a, b) => a.distance - b.distance);
  const neighbors = distances.slice(0, k);

  // Weighted voting: closer neighbors have more influence.
  // Weight = 1 / (distance + epsilon) to avoid division by zero.
  const epsilon = 1e-6;
  const voteWeights: Record<string, number> = {};
  let totalWeight = 0;

  for (const neighbor of neighbors) {
    const weight = 1 / (neighbor.distance + epsilon);
    voteWeights[neighbor.label] = (voteWeights[neighbor.label] || 0) + weight;
    totalWeight += weight;
  }

  // Build sorted crop scores
  const cropScores = Object.entries(voteWeights)
    .map(([crop, weight]) => ({
      crop,
      confidence: weight / totalWeight,
    }))
    .sort((a, b) => b.confidence - a.confidence);

  const top = cropScores[0];
  const alternatives = cropScores.slice(1, 5).map((c) => ({
    crop: c.crop,
    confidence: c.confidence,
  }));

  return {
    crop: top.crop,
    confidence: top.confidence,
    alternatives,
    neighbors: neighbors.map((n) => ({ label: n.label, distance: n.distance })),
  };
}

/**
 * Returns the normalized feature values for radar chart visualization.
 */
export function getNormalizedFeatures(input: SoilInput): Record<string, number> {
  const result: Record<string, number> = {};
  for (const key of FEATURE_KEYS) {
    result[key] = normalize(input[key], key);
  }
  return result;
}

/**
 * Returns the average feature profile for a given crop (normalized).
 */
export function getCropProfile(crop: string): Record<string, number> {
  const samples = cropDataset.filter((s) => s.label === crop);
  const result: Record<string, number> = {};
  for (const key of FEATURE_KEYS) {
    const avg = samples.reduce((sum, s) => sum + s[key], 0) / samples.length;
    result[key] = normalize(avg, key);
  }
  return result;
}
