import mongoose from "mongoose";

const competitionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    category: { type: String },
    deadline: { type: Date, required: true },
    registrationLink: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { Timestamp: true }
);

const Competition = mongoose.model("Competition", competitionSchema);
export default Competition;
