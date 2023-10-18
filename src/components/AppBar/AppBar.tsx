import { useContext } from "react";
import classes from "./AppBar.module.css";
import diagnalLogo2 from "../../assets/Diagnal-Logo-new.png";
import MovieContext from "../../store/context/movie-context";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
import { SyntheticEvent } from "react";
import UIContext from "../../store/context/UI-Context/UI-context";
import ProfileButton from "../UI/ProfileButton/ProfileButton";
import { useState } from "react";
import useOutsideClick from "../../hooks/handleClickOutside";

const AppBar = () => {
    // const [open, setOpen] = useState<boolean>(false);

    const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const movieCtx = useContext(MovieContext);
    const uiCtx = useContext(UIContext);
    const searchTermChangeHandler = (
        event: SyntheticEvent<HTMLInputElement, Event>
    ) => {
        movieCtx.setSearchTerm(event.currentTarget.value);
    };

    const handleClickOutside = () => {
        // setCount(0);
        // console.log("cicked outside");
        setProfileMenuOpen(false);
    };

    const profileRef = useOutsideClick(handleClickOutside);
    const logoClickHandler = () => {
        movieCtx.setSearchTerm("");
        navigate("/");
    };

    const backButtonHandler = () => {
        if (location.pathname == "/login") {
            navigate("/");
        } else {
            navigate(-1);
        }
    };

    const mobileSearchBarHandler = (
        _1: SyntheticEvent<HTMLDivElement, Event>
    ) => {
        uiCtx.toggleMobileSearchBar();
    };

    const profileClickHandler = (val: boolean | null) => {
        if (val === null || val === undefined) {
            setProfileMenuOpen((prevState) => !prevState);
        } else {
            setProfileMenuOpen(val);
        }
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
                        <>
                            <div className={classes.searchBar}>
                                <input
                                    id="search-input"
                                    type="text"
                                    placeholder="Search..."
                                    onChange={searchTermChangeHandler}
                                    name="search"
                                    value={movieCtx.searchTerm}
                                />
                                {/* </form> */}
                                <FaSearch
                                    className={classes.searchIcon}
                                    color="white"
                                    size={20}
                                />
                            </div>
                            <div
                                className={classes.searchButton}
                                onClick={mobileSearchBarHandler}
                            >
                                <FaSearch
                                    className={classes.searchIconButton}
                                    // color="white"
                                    size={20}
                                />
                            </div>
                        </>
                    )}
                    <div className={classes.profileButton} ref={profileRef}>
                        <ProfileButton
                            open={profileMenuOpen}
                            handleProfileOpen={profileClickHandler}
                        />
                    </div>
                    {
                        // (
                        //     location.pathname.includes("/movie/") ||
                        //     location.pathname.includes("/trailer"))&&
                        <div
                            className={classes.back}
                            onClick={backButtonHandler}
                        >
                            <BiArrowBack size={20} />
                            <span>Back</span>
                        </div>
                    }
                </div>
                {uiCtx.showMobileSearchBar && location.pathname === "/" && (
                    <div className={classes.mobileSearchBar}>
                        <input
                            id="mobile-search-input"
                            type="text"
                            placeholder="Search..."
                            onChange={searchTermChangeHandler}
                            name="mobile-search"
                            value={movieCtx.searchTerm}
                        />
                    </div>
                )}
            </div>
        </header>
    );
};

export default AppBar;
