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
                // children: [
                //     {
                //         path: "trailer",
                //         element: <MovieTrailerPage />,
                //     },
                // ],
            },
            //       {
            //         path: ":eventId",
            //         id: "event-detail",
            //         loader: eventDetailLoader,
            //         children: [
            //           {
            //             index: true,
            //             element: <EventDetailPage />,
            //             action: deleteEventAction,
            //           },
            //           {
            //             path: "edit",
            //             element: <EditEventPage />,
            //             action: manipulateEventAction,
            //           },
            //         ],
            //       },
            //       {
            //         path: "new",
            //         element: <NewEventPage />,
            //         action: manipulateEventAction,
            //       },
            //     ],
            //   },
            //   {
            //     path: "newsletter",
            //     element: <NewsletterPage />,
            //     action: newsletterAction,
            //   },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}
export default App;
