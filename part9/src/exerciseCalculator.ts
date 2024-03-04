interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average < target ? 1 : average === target ? 2 : 3;
  const ratingDescription = rating === 1 ? "not too bad but could be better" : rating === 2 ? "good job" : "excellent";
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
