interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const validateFormData = (formData: FormData) => {
  const { name, email, password, confirmPassword } = formData;

  if (name && confirmPassword) {
    if (name.length === 0) return false;
    if (confirmPassword.length === 0) return false;
  }

  if (confirmPassword && password !== confirmPassword) {
    return false;
  }

  if (email.length === 0 || password.length === 0) {
    return false;
  }

  return true;
};
