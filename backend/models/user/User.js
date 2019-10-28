import { Schema, model } from "mongoose";

import passportLocalMongoose from "passport-local-mongoose";

import { ROLE_LEVEL_NOT_APPLICABLE } from "../../constants/roles";

// TODO : Replace with https://github.com/dropbox/zxcvbn
const passwordValidator = (password, cb) => {
  // Symbols by ASCII ranges (http://www.asciitable.com/)
  const isGreaterThanMinLength = password.length > 7;
  const isLessThanMaxLength = password.length < 26;
  const containsSymbolRegex = /[$-/:-@{-~!"^_`\[\]]/;
  const containsCapitalRegex = /[A-Z]/;

  let error;

  if(!isLessThanMaxLength) {
    error = "Password has to be at least 8 characters long";
  } else if(!isGreaterThanMinLength) {
    error = "Password has to be no more than 28 characters long";
  } else if(!containsSymbolRegex.test(password)) {
    error = "Password has to contain at least one symbol";
  } else if(!containsCapitalRegex) {
    error = "Password has to contain at least one capital character";
  }

  return error ? cb(error) : cb();
};  

// Prevent inactive/banned accounts from logging in
const findByUsername = (model, queryParameters) => model.findOne({ ...queryParameters, active: true });

let userSchema = new Schema({
  username: { type: String, lowercase: true, unique: true, required: true },
  
  email: { type: String, unique: true, required: true },

  firstName: String,
  lastName: String,
  
  phoneNumber: String,

  roles: { 
    type: Object, 
    default: { 
      TEMPLATE_MANAGER: {
        scope: ROLE_LEVEL_NOT_APPLICABLE,
        LHINs: [],
        organizations: []
      }, 
      DATA_MANAGER: {
        scope: ROLE_LEVEL_NOT_APPLICABLE,
        LHINs: [],
        organizations: []
      }, 
      PACKAGE_MANAGER: {
        scope: ROLE_LEVEL_NOT_APPLICABLE,
        LHINs: [],
        organizations: []
      }, 
      USER_MANAGER: {
        scope: ROLE_LEVEL_NOT_APPLICABLE,
        LHINs: [],
        organizations: []
      }, 
      ORGANIZATION_MANAGER: {
        scope: ROLE_LEVEL_NOT_APPLICABLE,
        LHINs: [],
        organizations: []
      },
      LHIN_MANAGER: {
        scope: ROLE_LEVEL_NOT_APPLICABLE,
        LHINs: [],
        organizations: []
      },
      SECTOR_MANAGER: {
        scope: ROLE_LEVEL_NOT_APPLICABLE,
        LHINs: [],
        organizations: []
      },
      SYSTEM_MANAGER: {
        scope: ROLE_LEVEL_NOT_APPLICABLE,
        LHINs: [],
        organizations: []
      }
    } 
  },

  creationDate: { type: Date, default: Date.now, required: true },
  active: { type: Boolean, required: true, default: true },

  organization: { type: Array, default: [] }
});

userSchema.plugin(passportLocalMongoose, { findByUsername, passwordValidator });

export default model("User", userSchema);