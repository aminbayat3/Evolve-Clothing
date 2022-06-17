import styled from "styled-components";

import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/Evolve-Clothing.svg";

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  position: relative;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ELogo = styled(Logo)`
  margin-top: 5px;
  width: 45px;
  height: 90%;
`;

export const NavLinksContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

// .navigation {
    // height: 70px;
    // width: 100%;
    // display: flex;
    // justify-content: space-between;
    // margin-bottom: 25px;
    // position: relative;

//   .logo-container {
//     height: 100%;
//     width: 75px;
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     .logo {
//       margin-top: 5px;
//       width: 45px;
//       height: 90%;
//     }
//   }

//   .nav-links-container {
//     width: 50%;
//     height: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;

//     .nav-link {
//   padding: 10px 15px;
//   cursor: pointer;
//     }
//   }
// }
