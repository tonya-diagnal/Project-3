import React from "react";
import classes from "./AppBar.module.css";
import diagnalLogo from "../../assets/Diagnal-logo.svg";

const AppBar = () => {
  return (
    <header>
      <div className={classes.appbar}>
        <div className={classes.logo}>
          <img src={diagnalLogo} alt="Diagnal Logo" />
          <h1>DIAGNAL MOVIES</h1>
        </div>
        <div className={classes.search}>
          <input id="input" type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
