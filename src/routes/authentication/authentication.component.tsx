import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
import SignInForm from "../../component/sign-in-form/sign-in-form.component";

import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container row space-between my-6 mx-auto">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
