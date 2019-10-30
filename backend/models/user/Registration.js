import { Schema, model } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

let registrationSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },
  
  email: { type: String, unique: true, required: true },

  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  
  phoneNumber: { type: String, default: "" },

  creationDate: { type: Date, default: Date.now, required: true }
}, { minimize: false });

registrationSchema.plugin(passportLocalMongoose, { usernameUnique: false });

export default model("Registration", registrationSchema);