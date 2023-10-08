import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout/RootLayout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MovieHome from "./pages/MovieHome/MovieHome";
import MovieTrailerPage from "./pages/MovieTrailerPage/MovieTrailerPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import LoginPage from "./pages/Login/LoginPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInUser } from "./store/user/userSlice";
import ProtectedRoute from "./pages/ProtectedRoute/ProtectedRoute";
// import "./css-normalize/modern-normalize.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <MovieHome /> },
            {
                path: "/trailer",
                element: (
                    <ProtectedRoute>
                        <MovieTrailerPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "movie/:movieId",
                element: (
                    <ProtectedRoute>
                        <MovieDetailsPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
]);

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            const user = localStorage.getItem("user");
            // const user = JSON.parse();
            user && dispatch(signInUser(JSON.parse(user)));
        }
    }, []);
    return <RouterProvider router={router} />;
}
export default App;
