import express, { Request, Response } from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/", (_req: Request, res: Response) => {
  res.send("welcome");
});

app.get("/api/ping", (_req: Request, res: Response) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
