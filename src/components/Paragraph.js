import classes from "./Paragraph.module.css";

const Paragraph = (props) => {
  return (
    <div className={classes.container}>
      <p className={classes.para}>{props.children}</p>
    </div>
  );
};

export default Paragraph;

// <div className={props.paraDiv}>
//   <p className={classes.p}>{props.children}</p>
// </div>
