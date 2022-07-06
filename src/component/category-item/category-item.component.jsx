import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  Body,
  CategoryItemContainer,
  LargeCategoryItemContainer,
} from "./category-item.styles";

// let CustomCategoryItem = CategoryItemContainer;

const CategoryItem = ({ category }) => {
  const { title, imageUrl, size, route} = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  // CustomCategoryItem = size
  //   ? LargeCategoryItemContainer
  //   : CategoryItemContainer;

  return (
    // <CustomCategoryItem>
    <CategoryItemContainer size={size} onClick={onNavigateHandler}> 
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h1>{title.toUpperCase()}</h1>
        <span>SHOP NOW</span>
      </Body>
      </CategoryItemContainer>
      // <CustomCategoryItem>
  );
};

export default CategoryItem;
