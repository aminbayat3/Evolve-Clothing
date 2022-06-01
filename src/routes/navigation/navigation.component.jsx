import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/Evolve-Clothing.svg";
import "./navigation.styles.scss";

//Fragments let you group a list of children without adding extra nodes to the DOM. if i used a div instead of Fragment that div would be redundent.
const Navigation = () => {
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
          <Link className="nav-link" to="/contact">
            CONTACT
          </Link>
          <Link className="nav-link" to="/auth">
            SIGN IN
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
