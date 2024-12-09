import { Schema, model, Document } from "mongoose";

export interface IOffer extends Document {
  title: string;
  description: string;
  price: number;
}

const OfferSchema = new Schema<IOffer>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Offer = model<IOffer>("Offer", OfferSchema);
