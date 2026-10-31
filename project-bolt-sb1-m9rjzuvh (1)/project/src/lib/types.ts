export interface CropPredictionRow {
  id: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  recommended_crop: string;
  confidence: number;
  alternatives: { crop: string; confidence: number }[];
  created_at: string;
}
