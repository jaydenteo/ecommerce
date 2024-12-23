import dotenv from "dotenv";
import express, { Request, Response } from "express";
import "express-async-errors";
import connectDB from "./db/connect";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import morgan from "morgan";
import authRouter from "./routes/authRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("ecommerce api");
});

app.use("/api/v1/auth", authRouter);

// Error Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

start();
