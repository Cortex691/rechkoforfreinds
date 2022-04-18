import classes from "./Note.module.css";

const Note = (props) => {
  return <p className={classes.note}>{props.children}</p>;
};

export default Note;
