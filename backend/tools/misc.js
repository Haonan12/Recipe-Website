export const isObjectEmpty = (object) => {
  for(let key in object) {
    if(object.hasOwnProperty(key)) return false;
  }

  return true;
};

export const stringContainsSpace = (string) => /\s/g.test(string);

export const isValidMongooseObjectId = (stringId) => /^[a-fA-F0-9]{24}$/.test(stringId);