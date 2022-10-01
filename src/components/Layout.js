import { Fragment } from "react";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.holy_container}>
      <h2 className={classes.logo}>RECHKO FOR FRIENDS</h2>
      <hr className={classes.lajna}></hr>
      <div>{props.children}</div>
      <p className={classes.para1}>
        Developed by
        <button
          onClick={(e) => {
            e.preventDefault();
            window.open("https://nd-portfolio.netlify.app/", "_blank");
          }}
          formTarget="_blank"
          className={classes.cortex_1}
        >
          Nemanja Dragaš
        </button>
      </p>
    </div>
  );
};

export default Layout;
