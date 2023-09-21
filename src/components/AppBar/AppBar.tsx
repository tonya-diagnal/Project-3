import { useContext } from "react";
import classes from "./AppBar.module.css";
import diagnalLogo2 from "../../assets/Diagnal-Logo-new.png";
import MovieContext from "../../store/context/movie-context";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { SyntheticEvent } from "react";

const AppBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movieCtx = useContext(MovieContext);
    const searchTermChangeHandler = (
        event: SyntheticEvent<HTMLInputElement, Event>
    ) => {
        movieCtx.setSearchTerm(event.currentTarget.value);
    };

    const logoClickHandler = () => {
        navigate("/");
    };

    const backButtonHandler = () => {
        navigate(-1);
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
                            {/* <form onSubmit={searchSubmitHandler}> */}
                            <input
                                id="input"
                                type="text"
                                placeholder="Search..."
                                onChange={searchTermChangeHandler}
                                name="search"
                                value={movieCtx.searchTerm}
                            />
                            {/* </form> */}
                            <FaSearch
                                className={classes.searchIcon}
                                color="black"
                                size={20}
                            />
                        </div>
                    )}
                    {(location.pathname.includes("/movie/") ||
                        location.pathname.includes("/trailer")) && (
                        <div
                            className={classes.back}
                            onClick={backButtonHandler}
                        >
                            <BiArrowBack size={20} />
                            <span>Back</span>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AppBar;
