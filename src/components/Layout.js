import { Fragment } from "react";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <h2 className={classes.logo}>Rechko for friends</h2>
      <hr></hr>
      <div>{props.children}</div>
    </Fragment>
  );
};

export default Layout;
