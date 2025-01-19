import express from "express";
import cors from "cors";
import indexRouter from "./routes/index";

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

app.use(indexRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
