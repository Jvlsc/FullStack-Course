// BMI Calculator:
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) return "Underweight Range";
  if (bmi >= 18.5 && bmi <= 24.9) return "Normal Range";
  if (bmi >= 25 && bmi <= 29.9) return "Overweight Range";
  return "Obese Range";
};

// Run the BMI Calculator:
// (Hardcoded Values)
try {
  console.log(calculateBmi(180, 74));
} catch (error) {
  let errorMessage = "Error: ";
  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}