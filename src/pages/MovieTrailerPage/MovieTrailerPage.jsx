import React from "react";
import styles from "./MovieTrailerPage.module.css";
const MovieTrailerPage = () => {
    const src =
        "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
    return (
        <div className={styles.container}>
            <h1>Movie Trailer</h1>
            <video controls>
                <source
                    src={src}
                    type="video/mp4"
                    width="960px"
                    height="540px"
                />
                Video cant be played
            </video>
        </div>
    );
};

export default MovieTrailerPage;
