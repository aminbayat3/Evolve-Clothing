import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart-context";

import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  LogoContainer,
  ELogo,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";

//Fragments let you group a list of children without adding extra nodes to the DOM. if i used a div instead of Fragment that div would be redundent.
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <ELogo />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
      </NavigationContainer>
      {
        // isCartOpen ? (<CartDropdown />) : null
        isCartOpen && <CartDropdown /> //short circuit operator(&& , ||) && => double ampersand // components are always truthy values because they are functions// so the short circuit operator says if this total thing (the whole code inside of the curly braces) evaluates to true, then what im gonna return to you is going to be the last thing you gave me.
      }

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
