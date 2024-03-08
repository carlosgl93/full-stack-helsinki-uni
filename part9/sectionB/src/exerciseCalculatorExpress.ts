import { Request, Response } from "express";

// interface Result {
//   periodLength: number;
//   trainingDays: number;
//   success: boolean;
//   rating: number;
//   ratingDescription: string;
//   target: number;
//   average: number;
// }

export const calculateExercisesExpress = (req: Request, res: Response) => {
  console.log(req.body);

  const dailyHours: number[] = (req.body.dailyHours as string[])?.map(h => Number(h));
  const target: number = Number(req.body.target);

  if (!dailyHours || !target) {
    res.status(400).send({ error: "parameters missing" });
  }

  const periodLength = dailyHours?.length;
  const trainingDays = dailyHours?.filter(hours => hours > 0).length;
  const average = dailyHours?.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = average < target ? 1 : average === target ? 2 : 3;
  const ratingDescription = rating === 1 ? "not too bad but could be better" : rating === 2 ? "good job" : "excellent";
  res.send({
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  });
};
