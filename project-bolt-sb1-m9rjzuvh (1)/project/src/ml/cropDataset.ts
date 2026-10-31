export interface CropSample {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  label: string;
}

export interface SoilInput {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export const FEATURE_KEYS: (keyof SoilInput)[] = [
  'N',
  'P',
  'K',
  'temperature',
  'humidity',
  'ph',
  'rainfall',
];

export const FEATURE_LABELS: Record<keyof SoilInput, string> = {
  N: 'Nitrogen (N)',
  P: 'Phosphorus (P)',
  K: 'Potassium (K)',
  temperature: 'Temperature (°C)',
  humidity: 'Humidity (%)',
  ph: 'pH Level',
  rainfall: 'Rainfall (mm)',
};

export const FEATURE_UNITS: Record<keyof SoilInput, string> = {
  N: 'kg/ha',
  P: 'kg/ha',
  K: 'kg/ha',
  temperature: '°C',
  humidity: '%',
  ph: 'pH',
  rainfall: 'mm',
};

export const FEATURE_RANGES: Record<keyof SoilInput, { min: number; max: number; step: number; default: number }> = {
  N: { min: 0, max: 140, step: 1, default: 50 },
  P: { min: 5, max: 145, step: 1, default: 50 },
  K: { min: 5, max: 205, step: 1, default: 50 },
  temperature: { min: 8, max: 45, step: 0.1, default: 25 },
  humidity: { min: 14, max: 100, step: 0.1, default: 80 },
  ph: { min: 3.5, max: 10, step: 0.1, default: 6.5 },
  rainfall: { min: 20, max: 300, step: 1, default: 200 },
};

// Curated representative samples for each crop — derived from the
// Indian Crop Recommendation Dataset. Each crop has multiple samples
// covering its typical growing conditions.
export const cropDataset: CropSample[] = [
  // Rice
  { N: 90, P: 42, K: 43, temperature: 23.0, humidity: 82.0, ph: 6.5, rainfall: 236.0, label: 'rice' },
  { N: 85, P: 58, K: 41, temperature: 24.5, humidity: 80.0, ph: 7.0, rainfall: 210.0, label: 'rice' },
  { N: 95, P: 45, K: 44, temperature: 22.0, humidity: 85.0, ph: 6.2, rainfall: 250.0, label: 'rice' },
  { N: 80, P: 50, K: 40, temperature: 25.0, humidity: 78.0, ph: 6.8, rainfall: 225.0, label: 'rice' },
  { N: 88, P: 48, K: 42, temperature: 23.5, humidity: 83.0, ph: 6.4, rainfall: 240.0, label: 'rice' },

  // Wheat
  { N: 40, P: 60, K: 30, temperature: 20.0, humidity: 65.0, ph: 6.8, rainfall: 95.0, label: 'wheat' },
  { N: 35, P: 55, K: 35, temperature: 18.5, humidity: 60.0, ph: 7.0, rainfall: 85.0, label: 'wheat' },
  { N: 45, P: 65, K: 28, temperature: 21.0, humidity: 68.0, ph: 6.5, rainfall: 100.0, label: 'wheat' },
  { N: 38, P: 58, K: 32, temperature: 19.0, humidity: 62.0, ph: 6.9, rainfall: 90.0, label: 'wheat' },
  { N: 42, P: 62, K: 30, temperature: 20.5, humidity: 66.0, ph: 6.7, rainfall: 98.0, label: 'wheat' },

  // Maize
  { N: 70, P: 55, K: 30, temperature: 25.0, humidity: 70.0, ph: 6.5, rainfall: 120.0, label: 'maize' },
  { N: 75, P: 50, K: 35, temperature: 27.0, humidity: 72.0, ph: 6.0, rainfall: 110.0, label: 'maize' },
  { N: 65, P: 60, K: 28, temperature: 24.0, humidity: 68.0, ph: 6.8, rainfall: 130.0, label: 'maize' },
  { N: 72, P: 52, K: 32, temperature: 26.0, humidity: 71.0, ph: 6.3, rainfall: 115.0, label: 'maize' },
  { N: 68, P: 58, K: 30, temperature: 25.5, humidity: 69.0, ph: 6.6, rainfall: 125.0, label: 'maize' },

  // Chickpea
  { N: 40, P: 60, K: 20, temperature: 18.0, humidity: 65.0, ph: 7.5, rainfall: 80.0, label: 'chickpea' },
  { N: 38, P: 65, K: 18, temperature: 17.5, humidity: 62.0, ph: 7.8, rainfall: 75.0, label: 'chickpea' },
  { N: 42, P: 58, K: 22, temperature: 19.0, humidity: 68.0, ph: 7.2, rainfall: 85.0, label: 'chickpea' },
  { N: 35, P: 62, K: 20, temperature: 18.5, humidity: 64.0, ph: 7.6, rainfall: 78.0, label: 'chickpea' },
  { N: 45, P: 55, K: 25, temperature: 20.0, humidity: 66.0, ph: 7.4, rainfall: 82.0, label: 'chickpea' },

  // Kidney beans
  { N: 20, P: 70, K: 20, temperature: 20.0, humidity: 65.0, ph: 6.0, rainfall: 100.0, label: 'kidneybeans' },
  { N: 25, P: 65, K: 25, temperature: 21.0, humidity: 68.0, ph: 5.8, rainfall: 95.0, label: 'kidneybeans' },
  { N: 18, P: 72, K: 18, temperature: 19.5, humidity: 63.0, ph: 6.2, rainfall: 105.0, label: 'kidneybeans' },
  { N: 22, P: 68, K: 22, temperature: 20.5, humidity: 66.0, ph: 5.9, rainfall: 98.0, label: 'kidneybeans' },
  { N: 28, P: 62, K: 28, temperature: 22.0, humidity: 70.0, ph: 6.1, rainfall: 92.0, label: 'kidneybeans' },

  // Pigeon peas
  { N: 20, P: 75, K: 20, temperature: 25.0, humidity: 65.0, ph: 6.5, rainfall: 150.0, label: 'pigeonpeas' },
  { N: 25, P: 70, K: 25, temperature: 26.0, humidity: 68.0, ph: 6.2, rainfall: 145.0, label: 'pigeonpeas' },
  { N: 18, P: 78, K: 18, temperature: 24.5, humidity: 63.0, ph: 6.8, rainfall: 155.0, label: 'pigeonpeas' },
  { N: 22, P: 72, K: 22, temperature: 25.5, humidity: 66.0, ph: 6.4, rainfall: 148.0, label: 'pigeonpeas' },
  { N: 28, P: 68, K: 28, temperature: 27.0, humidity: 70.0, ph: 6.6, rainfall: 142.0, label: 'pigeonpeas' },

  // Moth beans
  { N: 20, P: 70, K: 20, temperature: 28.0, humidity: 55.0, ph: 7.0, rainfall: 50.0, label: 'mothbeans' },
  { N: 25, P: 65, K: 25, temperature: 29.0, humidity: 52.0, ph: 7.2, rainfall: 45.0, label: 'mothbeans' },
  { N: 18, P: 72, K: 18, temperature: 27.5, humidity: 58.0, ph: 6.8, rainfall: 55.0, label: 'mothbeans' },
  { N: 22, P: 68, K: 22, temperature: 28.5, humidity: 54.0, ph: 7.1, rainfall: 48.0, label: 'mothbeans' },
  { N: 28, P: 62, K: 28, temperature: 30.0, humidity: 50.0, ph: 7.4, rainfall: 40.0, label: 'mothbeans' },

  // Mung bean
  { N: 20, P: 70, K: 20, temperature: 28.0, humidity: 65.0, ph: 7.0, rainfall: 80.0, label: 'mungbean' },
  { N: 25, P: 65, K: 25, temperature: 29.0, humidity: 68.0, ph: 7.2, rainfall: 75.0, label: 'mungbean' },
  { N: 18, P: 72, K: 18, temperature: 27.5, humidity: 63.0, ph: 6.8, rainfall: 85.0, label: 'mungbean' },
  { N: 22, P: 68, K: 22, temperature: 28.5, humidity: 66.0, ph: 7.1, rainfall: 78.0, label: 'mungbean' },
  { N: 28, P: 62, K: 28, temperature: 30.0, humidity: 70.0, ph: 7.4, rainfall: 72.0, label: 'mungbean' },

  // Black gram
  { N: 20, P: 75, K: 20, temperature: 28.0, humidity: 65.0, ph: 7.0, rainfall: 80.0, label: 'blackgram' },
  { N: 25, P: 70, K: 25, temperature: 29.0, humidity: 68.0, ph: 7.2, rainfall: 75.0, label: 'blackgram' },
  { N: 18, P: 78, K: 18, temperature: 27.5, humidity: 63.0, ph: 6.8, rainfall: 85.0, label: 'blackgram' },
  { N: 22, P: 72, K: 22, temperature: 28.5, humidity: 66.0, ph: 7.1, rainfall: 78.0, label: 'blackgram' },
  { N: 28, P: 68, K: 28, temperature: 30.0, humidity: 70.0, ph: 7.4, rainfall: 72.0, label: 'blackgram' },

  // Lentil
  { N: 20, P: 70, K: 20, temperature: 20.0, humidity: 65.0, ph: 6.5, rainfall: 80.0, label: 'lentil' },
  { N: 25, P: 65, K: 25, temperature: 21.0, humidity: 68.0, ph: 6.2, rainfall: 75.0, label: 'lentil' },
  { N: 18, P: 72, K: 18, temperature: 19.5, humidity: 63.0, ph: 6.8, rainfall: 85.0, label: 'lentil' },
  { N: 22, P: 68, K: 22, temperature: 20.5, humidity: 66.0, ph: 6.4, rainfall: 78.0, label: 'lentil' },
  { N: 28, P: 62, K: 28, temperature: 22.0, humidity: 70.0, ph: 6.6, rainfall: 72.0, label: 'lentil' },

  // Pomegranate
  { N: 20, P: 25, K: 40, temperature: 25.0, humidity: 65.0, ph: 6.5, rainfall: 90.0, label: 'pomegranate' },
  { N: 25, P: 20, K: 45, temperature: 26.0, humidity: 68.0, ph: 6.2, rainfall: 85.0, label: 'pomegranate' },
  { N: 18, P: 28, K: 38, temperature: 24.5, humidity: 63.0, ph: 6.8, rainfall: 95.0, label: 'pomegranate' },
  { N: 22, P: 22, K: 42, temperature: 25.5, humidity: 66.0, ph: 6.4, rainfall: 88.0, label: 'pomegranate' },
  { N: 28, P: 18, K: 48, temperature: 27.0, humidity: 70.0, ph: 6.6, rainfall: 82.0, label: 'pomegranate' },

  // Banana
  { N: 100, P: 80, K: 50, temperature: 30.0, humidity: 80.0, ph: 6.5, rainfall: 150.0, label: 'banana' },
  { N: 95, P: 85, K: 48, temperature: 29.0, humidity: 78.0, ph: 6.8, rainfall: 145.0, label: 'banana' },
  { N: 105, P: 75, K: 52, temperature: 31.0, humidity: 82.0, ph: 6.2, rainfall: 155.0, label: 'banana' },
  { N: 98, P: 82, K: 50, temperature: 30.5, humidity: 80.0, ph: 6.6, rainfall: 148.0, label: 'banana' },
  { N: 102, P: 78, K: 50, temperature: 29.5, humidity: 79.0, ph: 6.4, rainfall: 152.0, label: 'banana' },

  // Mango
  { N: 20, P: 25, K: 30, temperature: 30.0, humidity: 60.0, ph: 6.0, rainfall: 100.0, label: 'mango' },
  { N: 25, P: 20, K: 35, temperature: 31.0, humidity: 58.0, ph: 5.8, rainfall: 95.0, label: 'mango' },
  { N: 18, P: 28, K: 28, temperature: 29.5, humidity: 62.0, ph: 6.2, rainfall: 105.0, label: 'mango' },
  { N: 22, P: 22, K: 32, temperature: 30.5, humidity: 60.0, ph: 6.0, rainfall: 98.0, label: 'mango' },
  { N: 28, P: 18, K: 38, temperature: 32.0, humidity: 55.0, ph: 5.9, rainfall: 92.0, label: 'mango' },

  // Grapes
  { N: 25, P: 130, K: 200, temperature: 25.0, humidity: 80.0, ph: 6.5, rainfall: 70.0, label: 'grapes' },
  { N: 20, P: 135, K: 195, temperature: 24.0, humidity: 82.0, ph: 6.2, rainfall: 65.0, label: 'grapes' },
  { N: 30, P: 125, K: 205, temperature: 26.0, humidity: 78.0, ph: 6.8, rainfall: 75.0, label: 'grapes' },
  { N: 22, P: 128, K: 198, temperature: 25.5, humidity: 80.0, ph: 6.4, rainfall: 72.0, label: 'grapes' },
  { N: 28, P: 132, K: 202, temperature: 24.5, humidity: 81.0, ph: 6.6, rainfall: 68.0, label: 'grapes' },

  // Watermelon
  { N: 80, P: 50, K: 50, temperature: 30.0, humidity: 80.0, ph: 6.5, rainfall: 100.0, label: 'watermelon' },
  { N: 75, P: 55, K: 48, temperature: 29.0, humidity: 82.0, ph: 6.2, rainfall: 95.0, label: 'watermelon' },
  { N: 85, P: 45, K: 52, temperature: 31.0, humidity: 78.0, ph: 6.8, rainfall: 105.0, label: 'watermelon' },
  { N: 78, P: 52, K: 50, temperature: 30.5, humidity: 80.0, ph: 6.4, rainfall: 98.0, label: 'watermelon' },
  { N: 82, P: 48, K: 50, temperature: 29.5, humidity: 81.0, ph: 6.6, rainfall: 102.0, label: 'watermelon' },

  // Muskmelon
  { N: 80, P: 50, K: 50, temperature: 30.0, humidity: 70.0, ph: 6.5, rainfall: 50.0, label: 'muskmelon' },
  { N: 75, P: 55, K: 48, temperature: 29.0, humidity: 72.0, ph: 6.2, rainfall: 45.0, label: 'muskmelon' },
  { N: 85, P: 45, K: 52, temperature: 31.0, humidity: 68.0, ph: 6.8, rainfall: 55.0, label: 'muskmelon' },
  { N: 78, P: 52, K: 50, temperature: 30.5, humidity: 70.0, ph: 6.4, rainfall: 48.0, label: 'muskmelon' },
  { N: 82, P: 48, K: 50, temperature: 29.5, humidity: 71.0, ph: 6.6, rainfall: 52.0, label: 'muskmelon' },

  // Apple
  { N: 20, P: 135, K: 200, temperature: 20.0, humidity: 90.0, ph: 6.5, rainfall: 100.0, label: 'apple' },
  { N: 25, P: 130, K: 205, temperature: 19.0, humidity: 92.0, ph: 6.2, rainfall: 95.0, label: 'apple' },
  { N: 18, P: 140, K: 195, temperature: 21.0, humidity: 88.0, ph: 6.8, rainfall: 105.0, label: 'apple' },
  { N: 22, P: 132, K: 198, temperature: 20.5, humidity: 90.0, ph: 6.4, rainfall: 98.0, label: 'apple' },
  { N: 28, P: 128, K: 202, temperature: 19.5, humidity: 91.0, ph: 6.6, rainfall: 102.0, label: 'apple' },

  // Orange
  { N: 10, P: 10, K: 40, temperature: 25.0, humidity: 90.0, ph: 7.0, rainfall: 100.0, label: 'orange' },
  { N: 15, P: 5, K: 45, temperature: 24.0, humidity: 92.0, ph: 6.8, rainfall: 95.0, label: 'orange' },
  { N: 8, P: 12, K: 38, temperature: 26.0, humidity: 88.0, ph: 7.2, rainfall: 105.0, label: 'orange' },
  { N: 12, P: 8, K: 42, temperature: 25.5, humidity: 90.0, ph: 6.9, rainfall: 98.0, label: 'orange' },
  { N: 18, P: 2, K: 48, temperature: 23.5, humidity: 91.0, ph: 7.1, rainfall: 102.0, label: 'orange' },

  // Papaya
  { N: 50, P: 50, K: 50, temperature: 30.0, humidity: 70.0, ph: 6.5, rainfall: 200.0, label: 'papaya' },
  { N: 55, P: 45, K: 55, temperature: 31.0, humidity: 72.0, ph: 6.2, rainfall: 195.0, label: 'papaya' },
  { N: 48, P: 55, K: 48, temperature: 29.0, humidity: 68.0, ph: 6.8, rainfall: 205.0, label: 'papaya' },
  { N: 52, P: 48, K: 52, temperature: 30.5, humidity: 70.0, ph: 6.4, rainfall: 198.0, label: 'papaya' },
  { N: 58, P: 42, K: 58, temperature: 32.0, humidity: 74.0, ph: 6.6, rainfall: 192.0, label: 'papaya' },

  // Coconut
  { N: 20, P: 25, K: 30, temperature: 30.0, humidity: 90.0, ph: 6.0, rainfall: 200.0, label: 'coconut' },
  { N: 25, P: 20, K: 35, temperature: 31.0, humidity: 92.0, ph: 5.8, rainfall: 195.0, label: 'coconut' },
  { N: 18, P: 28, K: 28, temperature: 29.0, humidity: 88.0, ph: 6.2, rainfall: 205.0, label: 'coconut' },
  { N: 22, P: 22, K: 32, temperature: 30.5, humidity: 90.0, ph: 6.0, rainfall: 198.0, label: 'coconut' },
  { N: 28, P: 18, K: 38, temperature: 32.0, humidity: 91.0, ph: 5.9, rainfall: 192.0, label: 'coconut' },

  // Cotton
  { N: 120, P: 40, K: 20, temperature: 25.0, humidity: 80.0, ph: 6.5, rainfall: 200.0, label: 'cotton' },
  { N: 115, P: 45, K: 18, temperature: 24.0, humidity: 82.0, ph: 6.2, rainfall: 195.0, label: 'cotton' },
  { N: 125, P: 38, K: 22, temperature: 26.0, humidity: 78.0, ph: 6.8, rainfall: 205.0, label: 'cotton' },
  { N: 118, P: 42, K: 20, temperature: 25.5, humidity: 80.0, ph: 6.4, rainfall: 198.0, label: 'cotton' },
  { N: 122, P: 40, K: 20, temperature: 24.5, humidity: 81.0, ph: 6.6, rainfall: 202.0, label: 'cotton' },

  // Jute
  { N: 80, P: 50, K: 40, temperature: 25.0, humidity: 80.0, ph: 6.5, rainfall: 200.0, label: 'jute' },
  { N: 75, P: 55, K: 38, temperature: 24.0, humidity: 82.0, ph: 6.2, rainfall: 195.0, label: 'jute' },
  { N: 85, P: 45, K: 42, temperature: 26.0, humidity: 78.0, ph: 6.8, rainfall: 205.0, label: 'jute' },
  { N: 78, P: 52, K: 40, temperature: 25.5, humidity: 80.0, ph: 6.4, rainfall: 198.0, label: 'jute' },
  { N: 82, P: 48, K: 40, temperature: 24.5, humidity: 81.0, ph: 6.6, rainfall: 202.0, label: 'jute' },

  // Coffee
  { N: 100, P: 30, K: 20, temperature: 25.0, humidity: 65.0, ph: 6.5, rainfall: 200.0, label: 'coffee' },
  { N: 95, P: 35, K: 18, temperature: 24.0, humidity: 68.0, ph: 6.2, rainfall: 195.0, label: 'coffee' },
  { N: 105, P: 28, K: 22, temperature: 26.0, humidity: 62.0, ph: 6.8, rainfall: 205.0, label: 'coffee' },
  { N: 98, P: 32, K: 20, temperature: 25.5, humidity: 65.0, ph: 6.4, rainfall: 198.0, label: 'coffee' },
  { N: 102, P: 30, K: 20, temperature: 24.5, humidity: 66.0, ph: 6.6, rainfall: 202.0, label: 'coffee' },
];

export const CROP_LABELS = [
  'rice', 'wheat', 'maize', 'chickpea', 'kidneybeans',
  'pigeonpeas', 'mothbeans', 'mungbean', 'blackgram', 'lentil',
  'pomegranate', 'banana', 'mango', 'grapes', 'watermelon',
  'muskmelon', 'apple', 'orange', 'papaya', 'coconut',
  'cotton', 'jute', 'coffee',
];
