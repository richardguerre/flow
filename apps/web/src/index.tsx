import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, redirect, RouterProvider } from "react-router-dom";
import "virtual:windi.css";
import {
  LOCAL_STORAGE_USER_TOKEN_KEY,
  RelayEnvironmentProvider,
} from "@flowdev/web/relay/environment";

const IndexPage = React.lazy(() => import("./pages/IndexPage"));
const TestPage = React.lazy(() => import("./pages/TestPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

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
    children: [{ path: "/", element: <IndexPage /> }],
  },
  { path: "/login", element: <TestPage /> },
  { path: "/test", element: <TestPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback="...">
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
