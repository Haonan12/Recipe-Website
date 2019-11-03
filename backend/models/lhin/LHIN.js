import { Schema, model } from "mongoose";

const LHINSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

export default model("LHIN", LHINSchema);
