import styled from "styled-components";

export const ProductPage = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 38px;
    margin: 0 auto 30px;
  }
`;

export const Items = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 18px;
`;

// .product-page {
//   display: flex;
//   flex-direction: column;

//   .title {
//     font-size: 38px;
//     margin: 0 auto 30px;
//   }

//   .items {
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr 1fr;
//     column-gap: 10px;
//     row-gap: 18px;
//   }
// }
