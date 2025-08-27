import mongoose from "mongoose";

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDesc: { type: String },
    description: { type: String },
    category: { type: String },
    topic: { type: String },
    registrationOpen: { type: Date, required: true },
    registrationClose: { type: Date, required: true },
    registrationLink: { type: String, required: true },
    eventDate: { type: Date },
    organizer: { type: String }, // Whos hosting
    prize: { type: String },
    location: { type: String }, // "Online" or "Jakarta, Indonesia"
    totalSaves: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Competition = mongoose.model("Competition", competitionSchema);
export default Competition;
