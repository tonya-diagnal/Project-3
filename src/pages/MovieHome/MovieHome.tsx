import { useContext, SyntheticEvent } from "react";
import MovieList from "../../components/MovieList/MovieList";
import UIContext from "../../store/context/UI-Context/UI-context";
import MovieContext from "../../store/context/movie-context";
import styles from "./MovieHome.module.css";
import MovieRecommendation from "../../components/MovieRecommendation/MovieRecommendation";
import Carousel from "../../components/UI/Carousel";
// import Carousel from "../../components/UI/Carousel";

const MovieHome = () => {
    const uiCtx = useContext(UIContext);
    const movieCtx = useContext(MovieContext);

    const searchTermChangeHandler = (
        event: SyntheticEvent<HTMLInputElement, Event>
    ) => {
        movieCtx.setSearchTerm(event.currentTarget.value);
    };

    return (
        <main>
            {uiCtx.showMobileSearchBar && (
                <div className={styles.searchBar}>
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
            <Carousel />
            <MovieRecommendation
                genres={["Action"]}
                currentMovieTitle="Crocodile Dundee"
                heading="Trending"
            />

            <MovieList />
        </main>
    );
};

export default MovieHome;
