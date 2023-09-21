import { useEffect } from "react";
import AppBar from "../../components/AppBar/AppBar";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
// import { useDispatch } from "react-redux";
import { fetchMovieList } from "../../store/movieList/movieActions";
import MovieProvider from "../../store/context/MovieProvider";

import { useMovieDispatch } from "../../store/store";
import UIProvider from "../../store/context/UI-Context/UI-Provider";

const RootLayout = () => {
    // const dispatch = useDispatch();
    const dispatch = useMovieDispatch();

    useEffect(() => {
        const controller = new AbortController();
        // dispatch(fetchMovieList(controller));
        dispatch(fetchMovieList(controller));
        return () => {
            controller.abort();
        };
    }, [dispatch]);

    return (
        <MovieProvider>
            <UIProvider>
                <AppBar />
                <div className={styles.container}>
                    <Outlet />
                </div>
            </UIProvider>
        </MovieProvider>
    );
};

export default RootLayout;
