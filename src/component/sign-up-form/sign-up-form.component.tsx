import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from "react-redux";

import { signUpStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

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
  const dispatch = useDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };

    try {
      dispatch(signUpStart(email, password, displayName));
      // const { user } = await createAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      // await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {  // "auth/email-already-in-use" instead of hardcoding it like this we do this
        alert("Cannot create user, email already in use");
      } else {
        console.log("error occured!", error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };
  // from the begining to this point everything gets re-rendered but React is smart enought to deal with Dom or after this point.
  return (
    <div className="sign-up d-flex flex-column col-md2-5 col-sm-9 col-xs-12 mx-xs-9 mx-md2-0">
      <h2 className="my-3 mx-0">Don't have an account</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          name= "displayName"
          type= "text"
          value= {displayName}
          onChange= {handleChange}
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password" 
          name= "password"
          type= "password"
          value= {password}
          onChange= {handleChange}
          required
        />
        <FormInput
          label="Confirm Password"
          name= "confirmPassword"
          type= "password"
          value= {confirmPassword}
          onChange= {handleChange}
          required
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
