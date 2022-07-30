import { SignupFormFields } from "../interfaces/signup-form.interface";

export type SignupUserType = Omit<SignupFormFields, "confirmPassword">;
