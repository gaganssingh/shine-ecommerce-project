interface FormErrors {
  nameError?: boolean | undefined;
  emailError: boolean | undefined;
  passwordError: boolean | undefined;
  confirmPasswordError?: boolean | undefined;
}

export const validateFormErrors = (formErrors: FormErrors) => {
  const { nameError, emailError, passwordError, confirmPasswordError } =
    formErrors;

  if (
    typeof nameError === "undefined" &&
    typeof confirmPasswordError === "undefined"
  ) {
    return !(emailError || passwordError);
  }

  if (nameError || emailError || passwordError || confirmPasswordError) {
    return false;
  }
  return true;
};
