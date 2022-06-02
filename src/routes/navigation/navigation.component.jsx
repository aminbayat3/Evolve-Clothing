import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

import { ReactComponent as Logo } from "../../assets/Evolve-Clothing.svg";
import "./navigation.styles.scss";

//Fragments let you group a list of children without adding extra nodes to the DOM. if i used a div instead of Fragment that div would be redundent.
const Navigation = () => {
  console.log("navigation");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser;
    setCurrentUser(null);
  }
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <Logo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <div className="nav-link" onClick={signOutHandler}>
              SIGN OUT
            </div>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
