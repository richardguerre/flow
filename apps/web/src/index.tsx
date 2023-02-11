import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, redirect, RouterProvider } from "react-router-dom";
import "virtual:windi.css";
import {
  LOCAL_STORAGE_USER_TOKEN_KEY,
  RelayEnvironmentProvider,
} from "@flowdev/web/relay/environment";
import { IconContext } from "@flowdev/icons";

const IndexView = React.lazy(() => import("./views/IndexView"));
const TestView = React.lazy(() => import("./views/TestView"));
const NotFoundView = React.lazy(() => import("./views/NotFoundView"));

const router = createBrowserRouter([
  {
    /**
     * This is the parent route for all routes requiring authentication.
     * If the user is not authenticated, they will be redirected to the login page.
     */
    path: "/",
    loader: () => {
      if (!window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY)) {
        return redirect("/login");
      }
      return null;
    },
    element: (
      <RelayEnvironmentProvider>
        <Outlet />
      </RelayEnvironmentProvider>
    ),
    children: [{ path: "/", element: <IndexView /> }],
  },
  { path: "/login", element: <TestView /> },
  { path: "/test", element: <TestView /> },
  { path: "*", element: <NotFoundView /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IconContext.Provider value={{ size: "20px" }}>
      <React.Suspense fallback="...">
        <RouterProvider router={router} />
      </React.Suspense>
    </IconContext.Provider>
  </React.StrictMode>
);
