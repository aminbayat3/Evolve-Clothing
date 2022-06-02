import { useState, useContext } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const  { setCurrentUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
       setCurrentUser(user);
      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("error occured!", error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  // from the begining to this point everything gets re-rendered but React is smart enought to deal with Dom or after this point.
  return (
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            name: "displayName",
            type: "text",
            value: displayName,
            onChange: handleChange,
            required: true,
          }}
        />
        <FormInput
          label="Email"
          inputOptions={{
            name: "email",
            type: "email",
            value: email,
            onChange: handleChange,
            required: true,
          }}
        />
        <FormInput
          label="Password" // by using an obejct we can make a seperation between the property of the label and the input elements.
          inputOptions={{
            name: "password",
            type: "password",
            value: password,
            onChange: handleChange,
            required: true,
          }}
        />
        <FormInput
          label="Confirm Password"
          inputOptions={{
            name: "confirmPassword",
            type: "password",
            value: confirmPassword,
            onChange: handleChange,
            required: true,
          }}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
