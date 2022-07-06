import { FormInputLable, Input, Group } from "./from-input.styles";

const FormInput = ({ label, inputOptions }) => {
  return (
    <Group>
      <Input {...inputOptions} />

      {label && (
        <FormInputLable shrink={ inputOptions.value.length }>
          {label}
        </FormInputLable>
      )}
    </Group>
  );
};

export default FormInput;
