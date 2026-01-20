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

export function exerciseCalculator(
  trainingArray: number[],
  target: number
): ReturnObject {
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
