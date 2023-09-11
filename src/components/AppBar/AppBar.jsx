import React, { useContext, useEffect } from "react";
import classes from "./AppBar.module.css";
import diagnalLogo from "../../assets/Diagnal-logo.svg";
import diagnalLogo2 from "../../assets/Diagnal-Logo-new.png";
import MovieContext from "../../store/context/movie-context";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AppBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movieCtx = useContext(MovieContext);
    const searchTermChangeHandler = (event) => {
        movieCtx.setSearchTerm(event.target.value);
    };
    // useEffect(() => {
    //     movieCtx.setSearchTerm("");
    // }, []);
    const logoClickHandler = () => {
        navigate("/");
    };

    const searchSubmitHandler = (event) => {
        event.preventDefault();
        // console.log(event.target.search.value);
        movieCtx.setSearchTerm(event.target.value);
        // navigate("/");
    };
    return (
        <header>
            <div className={classes.appbarContainer}>
                <div className={classes.appbar}>
                    <div className={classes.logo} onClick={logoClickHandler}>
                        <img src={diagnalLogo2} alt="Diagnal Logo" />
                        {/* <h1>DIAGNAL MOVIES</h1> */}
                    </div>
                    {location.pathname === "/" && (
                        <div className={classes.search}>
                            <form onSubmit={searchSubmitHandler}>
                                <input
                                    id="input"
                                    type="text"
                                    placeholder="Search..."
                                    onChange={searchTermChangeHandler}
                                    name="search"
                                />
                            </form>
                            <FaSearch
                                className={classes.searchIcon}
                                color="black"
                                size={20}
                            />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AppBar;
