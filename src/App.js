import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout/RootLayout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MovieHome from "./pages/MovieHome/MovieHome";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import MovieTrailerPage from "./pages/MovieTrailerPage/MovieTrailerPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <MovieHome /> },
            {
                path: "/trailer",
                element: <MovieTrailerPage />,
            },
            {
                path: "movie/:movieId",
                element: <MovieDetails />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}
export default App;
