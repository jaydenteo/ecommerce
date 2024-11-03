import { Document, Schema, Model, model, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

// Define the IUser interface
export interface IUser extends Document<Types.ObjectId> {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the UserSchema schema with type annotations
const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

// Pre-save middleware to hash the password
UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return; // Only hash if the password is modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Export the model
const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;
