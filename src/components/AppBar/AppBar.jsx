import React, { useContext } from "react";
import classes from "./AppBar.module.css";
import diagnalLogo from "../../assets/Diagnal-logo.svg";
import MovieContext from "../../store/context/movie-context";

const AppBar = () => {
    const movieCtx = useContext(MovieContext);
    const searchTermChangeHandler = (event) => {
        movieCtx.setSearchTerm(event.target.value);
    };
    return (
        <header>
            <div className={classes.appbar}>
                <div className={classes.logo}>
                    <img src={diagnalLogo} alt="Diagnal Logo" />
                    <h1>DIAGNAL MOVIES</h1>
                </div>
                <div className={classes.search}>
                    <input
                        id="input"
                        type="text"
                        placeholder="Search..."
                        onChange={searchTermChangeHandler}
                    />
                    <button>Search</button>
                </div>
            </div>
        </header>
    );
};

export default AppBar;
