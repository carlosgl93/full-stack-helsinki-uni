import { Request, Response } from "express";
import { calculateBmiExpress } from "./calculateBmiExpress";

export const bmiEndpoint = (req: Request, res: Response) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).json({ error: "malformatted parameters" });
  }
  const bmi = calculateBmiExpress(height, weight);
  res.json({ weight, height, bmi });
};
