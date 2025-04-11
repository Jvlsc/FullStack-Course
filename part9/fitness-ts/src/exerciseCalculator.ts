// Exercise Result Interface:
interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

// Exercise Calculator:
const calculateExercises = (data: Array<number>, target: number): ExerciseResult => {
  const periodLength = data.length;
  const trainingDays = data.filter(day => day !== 0).length;
  const average = data.reduce((acc, curr) => acc + curr, 0) / data.length;
  const success = average >= target;
  const rating = 
    average >= target ? 3 : 
    average >= target * 0.8 ? 2 : 1;
  const ratingDescription = 
    rating === 3 ? 'Excellent job!' : 
    rating === 2 ? 'Not too bad but could be better' : 'You need to work harder';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  } as ExerciseResult;
};

// Run the Exercise Calculator:
// (Hardcoded Values)
try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error) {
  let errorMessage = "Error: ";
  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}