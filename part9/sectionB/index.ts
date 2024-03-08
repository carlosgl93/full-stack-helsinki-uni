import express from "express";
import { bmiEndpoint } from "./src/bmiEndpoint";
import { calculateExercisesExpress } from "./src/exerciseCalculatorExpress";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => bmiEndpoint(req, res));

app.post("/exercises", (req, res) => calculateExercisesExpress(req, res));
  

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
