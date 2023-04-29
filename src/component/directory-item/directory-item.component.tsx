import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { DirectoryCategory } from '../directory/directory-data';

import "./directory-item.styles.scss";

export type DirectoryItemProps = {
  category: DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
  const { title, imageUrl, size, route} = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <div className={`directory-item col-3 flex-grow-1 mx-2 my-3 center ${size ? "large": ""}`} onClick={onNavigateHandler}> 
      <div className='directory-item__background-image w-100 h-100' style={{
        backgroundImage: `url(${imageUrl})`
      }} />
      <div className='directory-item__body px-4 center flex-column position-absolute'>
        <h1 className='directory-item__body__title my-0 mx-1'>{title.toUpperCase()}</h1>
        <span className='directory-item__body__subtitle'>SHOP NOW</span>
      </div>
      </div>
  );
};

export default DirectoryItem;
