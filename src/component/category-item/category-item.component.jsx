import "./category-item.styles.scss";

const CategoryItem = ({ category }) => {
  const { title, imageUrl, size } = category;
  return (
    <div className={`${size ? "large" : ""} category-item`}>
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default CategoryItem;
