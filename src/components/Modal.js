import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={classes.container}>
      <div onClick={props.closeModal} className={classes.close}>
        {" "}
        X{" "}
      </div>
      <h1 className={classes.header}>{props.message}</h1>
      <p className={classes.para}>Ријеч је била {props.word}.</p>
      <button
        className={classes.btn}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          window.open("https://rechkoforfriends.com");
        }}
      >
        Направите нову игру.
      </button>
    </div>
  );
};

export default Modal;
