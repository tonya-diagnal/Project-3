// import React from "react";
// import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { CgProfile } from "react-icons/cg";
import styles from "./ProfileButton.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getUser,
    isLoggedIn,
    signOutUser,
} from "../../../store/user/userSlice";

const ProfileButton = ({
    open,
    handleProfileOpen,
}: {
    open: boolean;
    handleProfileOpen: (val: boolean | null) => void;
}) => {
    const dispatch = useDispatch();
    const isSignedIn = useSelector(isLoggedIn);
    const user = useSelector(getUser);
    const navigate = useNavigate();
    // const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        handleProfileOpen(null);
    };

    const loginClickHandler = () => {
        handleProfileOpen(false);
        navigate("/login");
    };

    const logoutClickHandler = () => {
        handleProfileOpen(false);
        dispatch(signOutUser());
        navigate('/');
    };

    let menu = [
        <button onClick={loginClickHandler}>Login</button>,
        // <button onClick={handleMenuTwo}>Menu 2</button>,
    ];

    if (isSignedIn) {
        menu = [
            <button>
                {user ? user.email.slice(0, 4).toUpperCase() : "User"}
            </button>,
            <button onClick={logoutClickHandler}>Sign out</button>,
        ];
    }
    return (
        <Dropdown
            open={open}
            // trigger={<button onClick={handleOpen}>Dropdown</button>}
            trigger={
                <CgProfile
                    onClick={handleOpen}
                    className={styles.profileIcon}
                    size={31}
                />
            }
            menu={menu}
        />
    );
};

export default ProfileButton;
