import { InputHTMLAttributes, FC } from "react";

import { FormInputLabel, Input, Group } from "./from-input.styles";

export type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input {...otherProps} />

      {label && (
        <FormInputLabel shrink={ Boolean(typeof otherProps.value === 'string' && otherProps.value.length) }> 
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
}; // we could have said: (otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length) but since undefined is a primitive type in javascript there's no need to do the first check the second check is doing both of them

export default FormInput;
