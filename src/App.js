import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout/RootLayout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MovieHome from "./pages/MovieDetails/MovieHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MovieHome /> },
      //   {
      //     path: "events",
      //     element: <EventsRootLayout />,
      //     children: [
      //       {
      //         index: true,
      //         element: <EventsPage />,
      //         loader: eventsLoader,
      //       },
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
