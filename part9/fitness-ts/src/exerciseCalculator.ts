// Exercise Values Interface:
interface ExerciseValues {
  target: number;
  daily_exercises: Array<number>;
}

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

// Parse Arguments:
const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const target = Number(args[2]);
  const daily_exercises = args.slice(3).map(Number);

  if (!isNaN(target) && !daily_exercises.every(isNaN)) {
    return { target, daily_exercises } as ExerciseValues;
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

// Exercise Calculator:
const calculateExercises = (target: number, daily_exercises: Array<number>): ExerciseResult => {
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter(day => day !== 0).length;
  const average = daily_exercises.reduce((acc, curr) => acc + curr, 0) / daily_exercises.length;
  const success = average >= target;
  const rating = 
    average >= target ? 3 : 
    average >= target * 0.8 ? 2 : 1;
  const ratingDescription = 
    rating === 3 ? 'Excellent job!' : 
    rating === 2 ? 'Not too bad but could be better' : 'Really bad!';

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

// Export Functions:
export { calculateExercises, ExerciseValues };

// Run as a Script:
if (require.main === module) {
  try {
    const { target, daily_exercises } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(target, daily_exercises));
  } catch (error) {
    let errorMessage = "Error: ";
    if (error instanceof Error) errorMessage += error.message;
    console.log(errorMessage);
  }
}