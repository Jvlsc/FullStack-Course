import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).json({ error: "Missing height and/or weight" });
    return;
  }

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: "Invalid height and/or weight" });
    return;
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  res.json({ height, weight, bmi });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});