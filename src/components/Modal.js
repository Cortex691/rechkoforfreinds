import classes from "./Modal.module.css";

import win from "../assets/win.png";

const Modal = (props) => {
  return (
    <div className={classes.container}>
      <div onClick={props.closeModal} className={classes.close}>
        {" "}
        X{" "}
      </div>
      <img className={classes.icon} src={props.icon} />
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
        Направите нову игру
      </button>
    </div>
  );
};

export default Modal;
