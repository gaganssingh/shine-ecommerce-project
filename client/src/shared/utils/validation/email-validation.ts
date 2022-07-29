import { InputValidationType } from "./models/input-validation.type";

export const validateEmail: InputValidationType = (email: string): boolean => {
  // RFC2822 Email Validation Standard
  // https://regexr.com/2rhq7
  const regEx =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return regEx.test(email.trim());
};
