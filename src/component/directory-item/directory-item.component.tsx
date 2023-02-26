import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { DirectoryCategory } from '../directory/directory-data';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles";

export type DirectoryItemProps = {
  category: DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { title, imageUrl, size, route} = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer size={size ? size : ''} onClick={onNavigateHandler}> 
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h1>{title.toUpperCase()}</h1>
        <span>SHOP NOW</span>
      </Body>
      </DirectoryItemContainer>
  );
};

export default DirectoryItem;
