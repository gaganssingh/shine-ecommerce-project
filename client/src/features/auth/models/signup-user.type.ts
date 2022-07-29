import { SignupFormFields } from "./signup-form.interface";

export type SignupUserType = Omit<SignupFormFields, "confirmPassword">;
