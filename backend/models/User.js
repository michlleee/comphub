import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "organizer"],
      required: true,
    },
    savedCompetitions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Competition" },
    ],

    //organizer only feilds
    organizationName: { type: String },
    contactInfo: { type: String },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
