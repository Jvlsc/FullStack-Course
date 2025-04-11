// BMI Values Interface:
interface BmiValues {
  height: number;
  weight: number;
}

// Parse Arguments:
const parseBMIArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    } as BmiValues;
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

// BMI Calculator:
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) return "Underweight Range";
  if (bmi >= 18.5 && bmi <= 24.9) return "Normal Range";
  if (bmi >= 25 && bmi <= 29.9) return "Overweight Range";
  return "Obese Range";
};

// Export Functions:
export { calculateBmi };


// Run as a Script:
if (require.main === module) {
  try {
    const { height, weight } = parseBMIArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error) {
    let errorMessage = "Error: ";
    if (error instanceof Error) errorMessage += error.message;
    console.log(errorMessage);
  }
}