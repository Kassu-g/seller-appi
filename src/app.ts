import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { Offer } from "../models/offer";

const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
mongoose
  .connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/upload", async (req: Request, res: Response) => {
const auth = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { title, description, price } = req.body;

    if (!title || !description || typeof price === "undefined") {
      return res.status(400).send("All fields are required.");
    }

    const newOffer = new Offer({
      title,
      description,
      price,
    });

    await newOffer.save();
    return res.status(201).send("Offer saved successfully.");
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).send("Server error: " + err.message);
    }

    return res.status(500).send("An unknown error occurred.");
  }
};


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
})