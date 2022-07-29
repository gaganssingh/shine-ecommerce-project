import { ChangeEvent, useReducer } from "react";
import { Action } from "../../shared/models/action.interface";
import { InputValidationType } from "../../shared/utils/validation/models/input-validation.type";
import {
  InputActionType,
  INPUT_ACTION_BLUR,
  INPUT_ACTION_CHANGE,
  INPUT_ACTION_CLEAR,
} from "./models/inputAction";
import { InputState } from "./models/inputState.interface";

const initialInputState: InputState = {
  text: "",
  touched: false,
  // isValid: true,
};

const inputReducer = (state: InputState, action: Action<InputActionType>) => {
  const { type, payload = "" } = action;

  switch (type) {
    case INPUT_ACTION_CHANGE:
      return {
        ...state,
        text: payload,
      };
    case INPUT_ACTION_BLUR:
      return {
        ...state,
        touched: true,
      };
    case INPUT_ACTION_CLEAR:
      return {
        text: "",
        touched: false,
      };
    default:
      return state;
  }
};

export const useInput = (validatorFn?: InputValidationType) => {
  const [{ text, touched }, dispatch] = useReducer(
    inputReducer,
    initialInputState
  );

  let error;
  if (validatorFn) {
    const isValid = validatorFn(text);

    // Display an error for the input if
    // the text is not valid && the input was touched
    error = !isValid && touched;
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: INPUT_ACTION_CHANGE, payload: e.target.value });

  const inputBlurHandler = () => dispatch({ type: INPUT_ACTION_BLUR });

  const inputClearHandler = () => dispatch({ type: INPUT_ACTION_CLEAR });

  return {
    text,
    error,
    inputChangeHandler,
    inputBlurHandler,
    inputClearHandler,
  };
};
