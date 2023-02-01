import styled from "styled-components";

import { Link } from "react-router-dom";

export const ProductPreview = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: grey;
  }
`;

export const Preview = styled.div`
  display: flex;
  justify-content: space-between;
`;

// .products-preview {
//     display: flex;
//     flex-direction: column;
//     margin-bottom: 30px;

//     .title {
//         font-size: 28px;
//         margin-bottom: 25px;
//         cursor: pointer;
//         transition: color 0.2s ease;

//         &:hover {
//             color: grey;
//         }
//     }

//     .preview {
//         display:flex;
//         justify-content: space-between;
//     }
// }
