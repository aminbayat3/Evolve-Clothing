import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, onHandleClick, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} onClick={onHandleClick ? onHandleClick : null}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
