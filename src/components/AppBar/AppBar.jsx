import React, { useContext } from "react";
import classes from "./AppBar.module.css";
import diagnalLogo from "../../assets/Diagnal-logo.svg";
import MovieContext from "../../store/context/movie-context";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AppBar = () => {
    const navigate = useNavigate();
    const movieCtx = useContext(MovieContext);
    const searchTermChangeHandler = (event) => {
        movieCtx.setSearchTerm(event.target.value);
    };

    const logoClickHandler = () => {
        navigate("/");
    };
    return (
        <header>
            <div className={classes.appbar}>
                <div className={classes.logo} onClick={logoClickHandler}>
                    <img src={diagnalLogo} alt="Diagnal Logo" />
                    {/* <h1>DIAGNAL MOVIES</h1> */}
                </div>
                <div className={classes.search}>
                    <input
                        id="input"
                        type="text"
                        placeholder="Search..."
                        onChange={searchTermChangeHandler}
                    />
                    <FaSearch
                        className={classes.searchIcon}
                        color="black"
                        size={20}
                    />
                    {/* <button>Search</button> */}
                </div>
            </div>
        </header>
    );
};

export default AppBar;
