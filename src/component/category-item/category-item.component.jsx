import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
  const { title, imageUrl, size } = category;
  return (
    <div className={`${size ? 'large' : ''} category-item`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
          <h2>{title}</h2>
          <p>Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
