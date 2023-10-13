// import React from "react";
import { FormEvent, useState } from "react";
import styles from "./Login.module.css";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getUser, signInUser } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(getUser);
    const [loginError, setLoginError] = useState(false);
    console.log("rdx", user);
    const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);
        if (
            formDataObj["email"] === "test@diagnal.com" &&
            formDataObj["password"] === "123"
        ) {
            dispatch(signInUser(formDataObj));
            navigate("/");
            // navigate("")
        } else {
            setLoginError(true);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <CgProfile
                        // onClick={handleOpen}ss
                        className={styles.profileIcon}
                        size={65}
                        color="white"
                    />
                </div>
                <div className={styles.details}>
                    <p className={styles.title}>
                        <b>Login</b>
                    </p>
                    <div className={styles.description}>
                        <p>Enter your credentials</p>
                    </div>
                </div>
                <form className={styles.form} onSubmit={formSubmitHandler}>
                    <div className={styles.formField}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <button type="submit">Login</button>
                        {loginError && (
                            <div className={styles.status}>
                                Invalid credentials
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
