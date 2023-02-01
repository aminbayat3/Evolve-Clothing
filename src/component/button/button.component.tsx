import { FC, ButtonHTMLAttributes } from "react";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from "./button.styles";

export enum BUTTON_TYPE_CLASSES {
  base = "base",
  google = "google-sign-in",
  inverted = "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  // disabled?: boolean; we can get rid of this line because ButtonHtmlAttributes already has that attribute
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton {...otherProps}>
      {otherProps.disabled ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
