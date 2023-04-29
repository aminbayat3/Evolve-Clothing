import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";

import { signOutStart } from "../../store/user/user.action";

import { ReactComponent as Logo } from "../../assets/Evolve-Clothing.svg";
import "./navigation.styles.scss";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOutUser = () => dispatch(signOutStart());

  return (
    <>
      <div className="nav d-flex space-between position-relative mb-5 w-100">
        <Link className="nav__logo-container center h-100" to="/">
          <Logo className="nav__logo-container__logo mt-1" />
        </Link>
        <div className="nav__links d-flex align-items-center justify-flex-end ">
          <Link className="nav__links__link py-3 px-4" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <div className="nav__links__link py-3 px-4" onClick={signOutUser}>
              SIGN OUT
            </div>
          ) : (
            <Link className="nav__links__link py-3 px-4" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
      {
        isCartOpen && <CartDropdown /> //short circuit operator(&& , ||) && => double ampersand // components are always truthy values because they are functions// so the short circuit operator says if this total thing (the whole code inside of the curly braces) evaluates to true, then what im gonna return to you is going to be the last thing you gave me.
        // notice that this CartDropdown component is getting mounted and unmounted based on isCartOpen so that's why useEffect gets called everytime
      }

      <Outlet />
    </>
  );
};

export default Navigation;
