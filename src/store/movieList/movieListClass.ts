export type MovieItemType = {
    id: number;
    title: string;
    year: string;
    runtime: string;
    genres: GenreType[];
    director: string;
    actors: string;
    plot: string;
    posterUrl: string;
};

export type GenreType =
    | "Comedy"
    | "Fantasy"
    | "Crime"
    | "Drama"
    | "Music"
    | "Adventure"
    | "History"
    | "Thriller"
    | "Animation"
    | "Family"
    | "Mystery"
    | "Biography"
    | "Action"
    | "Film-Noir"
    | "Romance"
    | "Sci-Fi"
    | "War"
    | "Western"
    | "Horror"
    | "Musical"
    | "Sport";

export class MovieListClass {
    constructor(
        public movies: MovieItemType[] = [
            {
                id: 1,
                title: "",
                year: "",
                runtime: "",
                genres: [],
                director: "",
                actors: "",
                plot: "",
                posterUrl: "",
            },
        ],
        public genres: GenreType[]
    ) {}

    replaceMovieList(movies: MovieItemType[], genres: GenreType[]) {
        this.movies = movies;
        this.genres = genres;
    }
}
