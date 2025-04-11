// Exercise Values Interface:
interface ExerciseValues {
  target: number;
  data: Array<number>;
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
  const data = args.slice(3).map(Number);

  if (!isNaN(target) && !data.every(isNaN)) {
    return { target, data } as ExerciseValues;
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

// Exercise Calculator:
const calculateExercises = (target: number, data: Array<number>): ExerciseResult => {
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
  const { target, data } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, data));
} catch (error) {
  let errorMessage = "Error: ";
  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}