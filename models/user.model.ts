// user model
import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    image: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    savedBlogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;
