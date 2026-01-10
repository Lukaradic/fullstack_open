const height = process.argv[2];
const weight = process.argv[3];

function bmiCalculator(heightString: string, weightString: string): string {
  const height = parseInt(heightString);
  const weight = parseInt(weightString);

  if (!weight || !height) {
    return "Invalid parameters, please provide height and weight";
  }
  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi > 24.9) {
    return "Overweight";
  }
  return "Normal range";
}
const response = bmiCalculator(height, weight);

console.log(response);
