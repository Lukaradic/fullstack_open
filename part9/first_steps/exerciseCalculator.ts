interface ReturnObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  rating: number;
  ratingDescription: string;
}

function getExerciseArray(): number[] {
  const length = process.argv.length;
  const arr: number[] = [];

  for (let i = 3; i < length; i++) {
    arr.push(parseFloat(process.argv[i]));
  }
  return arr;
}
function getRating(average: number, target: number): Rating {
  if (average < target) {
    return {
      rating: 1,
      ratingDescription: "Need to do better",
    };
  }
  if (average > target) {
    return {
      rating: 3,
      ratingDescription: "Great work, keep it up",
    };
  }
  return {
    rating: 2,
    ratingDescription: "Goals met",
  };
}

function exerciseCalculator(
  trainingArray: number[],
  targetString: string
): ReturnObject | string {
  const target = parseInt(targetString);
  if (!target) {
    return "Invalid parameters";
  }
  let trainingDays = 0;
  let trainingHoursAccumulated = 0;
  trainingArray.forEach((el) => {
    if (el > 0) {
      trainingDays++;
    }
    trainingHoursAccumulated += el;
  });

  const average = trainingHoursAccumulated / trainingArray.length;
  const { rating, ratingDescription } = getRating(average, target);

  return {
    periodLength: trainingArray.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
}

const target = process.argv[2];

const result = exerciseCalculator(getExerciseArray(), target);

console.log(result);
