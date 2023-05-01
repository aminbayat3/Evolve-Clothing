import { FC, ButtonHTMLAttributes } from "react";

import './button.styles.scss';


export enum BUTTON_TYPE_CLASSES {
  google = "google",
  inverted = "inverted",
};

export type ButtonProps = {
  buttonType?: string,
  // disabled?: boolean; we can get rid of this line because ButtonHtmlAttributes already has that attribute
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`base-button position-relative text-uppercase d-flex justify-content-center ${BUTTON_TYPE_CLASSES[buttonType as keyof typeof BUTTON_TYPE_CLASSES]}`} {...otherProps}>
      {otherProps.disabled ? (<div className="base-button__spinner-container position-absolute" />) : children}
    </button>
  );
};

export default Button;
