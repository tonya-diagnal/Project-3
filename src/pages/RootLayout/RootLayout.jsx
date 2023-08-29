import React, { Fragment, useEffect } from "react";
import AppBar from "../../components/AppBar/AppBar";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieList } from "../../store/movieList/movieActions";

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    dispatch(fetchMovieList(controller));
    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <>
      <AppBar />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
