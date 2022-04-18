import classes from "./Form.module.css";
import Button from "./Button";

const Form = (props) => {
  return (
    <form className={classes.form} onSubmit={props.onSubmit}>
      <br></br>
      <input
        placeholder={props.placeHolder}
        className={classes.input}
        minLength={props.minL}
        maxLength={props.maxL}
        ref={props.enteredRef}
        disabled={!props.showBtn}
        type="text"
      ></input>
      <br></br>
      {props.showBtn && <Button>Даље</Button>}
    </form>
  );
};

export default Form;
