import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseValues } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const { target, daily_exercises } = req.body as ExerciseValues;

  if (!target || !daily_exercises) {
    res.status(400).json({ error: "Missing parameters" });
    return;
  }

  if (isNaN(Number(target)) || daily_exercises.map(Number).some(isNaN)) {
    res.status(400).json({ error: "Invalid parameters" });
    return;
  }

  const result = calculateExercises(Number(target), daily_exercises.map(Number));

  res.json(result);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});