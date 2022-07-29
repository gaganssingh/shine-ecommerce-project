import { InputValidationType } from "./models/input-validation.type";

interface LengthOptions {
  min?: number;
  max?: number;
}

const _validateLength: InputValidationType = (
  text: string,
  options?: LengthOptions
): boolean => {
  const textLength = text.trim().length;

  if (options?.min && textLength < options.min) return false;
  if (options?.max && textLength > options.max) return false;

  return true;
};

export const validateNameLength: InputValidationType = (
  text: string
): boolean => _validateLength(text, { min: 2 });

export const validatePasswordLength: InputValidationType = (
  text: string
): boolean => _validateLength(text, { min: 6, max: 35 });
