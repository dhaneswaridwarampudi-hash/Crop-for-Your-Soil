/*
# Create crop_predictions table (single-tenant, no auth)

1. New Tables
- `crop_predictions`
  - id (uuid, primary key)
  - nitrogen (float, not null) — N ratio in soil
  - phosphorus (float, not null) — P ratio in soil
  - potassium (float, not null) — K ratio in soil
  - temperature (float, not null) — temperature in °C
  - humidity (float, not null) — relative humidity %
  - ph (float, not null) — soil pH value
  - rainfall (float, not null) — rainfall in mm
  - recommended_crop (text, not null) — top predicted crop
  - confidence (float, not null) — confidence score 0-1
  - alternatives (jsonb) — array of {crop, confidence} for runner-up crops
  - created_at (timestamp, default now)

2. Security
- Enable RLS on `crop_predictions`.
- Single-tenant app with no sign-in: allow anon + authenticated CRUD.
- All data is intentionally public/shared (demo application).
*/

CREATE TABLE IF NOT EXISTS crop_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nitrogen float NOT NULL,
  phosphorus float NOT NULL,
  potassium float NOT NULL,
  temperature float NOT NULL,
  humidity float NOT NULL,
  ph float NOT NULL,
  rainfall float NOT NULL,
  recommended_crop text NOT NULL,
  confidence float NOT NULL,
  alternatives jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crop_predictions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_predictions" ON crop_predictions;
CREATE POLICY "anon_select_predictions" ON crop_predictions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_predictions" ON crop_predictions;
CREATE POLICY "anon_insert_predictions" ON crop_predictions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_predictions" ON crop_predictions;
CREATE POLICY "anon_delete_predictions" ON crop_predictions FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_crop_predictions_created_at
  ON crop_predictions (created_at DESC);
