import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={classes.body}>
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        className={classes.btn}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
