import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin", "seller"], required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
