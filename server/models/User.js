import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // sessionExpires: { type: Date, default: () => new Date(+new Date() + 7*24*60*60*1000) }
});

const User = model("User", userSchema);

export default User;
