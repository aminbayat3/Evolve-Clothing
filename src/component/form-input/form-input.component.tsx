import { InputHTMLAttributes, FC } from "react";

import "./from-input.styles.scss";

export type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="my-6 position-relative">
      <input className="form-input w-100 py-3 pe-3 ps-1 my-5" {...otherProps} />

      {label && (
        <label className={`form-input-label position-absolute ${(typeof otherProps.value === 'string') && (otherProps.value.length ? "shrink" : "")}`}> 
          {label}
        </label>
      )}
    </div>
  );
}; // we could have said: (otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length) but since undefined is a primitive type in javascript there's no need to do the first check the second check is doing both of them

//shrink={ Boolean(typeof otherProps.value === 'string' && otherProps.value.length) }

export default FormInput;
