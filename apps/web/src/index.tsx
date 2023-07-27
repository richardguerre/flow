import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, redirect, RouterProvider } from "react-router-dom";
import {
  LOCAL_STORAGE_USER_TOKEN_KEY,
  RelayEnvironmentProvider,
} from "@flowdev/web/relay/environment";
import { IconContext } from "@flowdev/icons";
import initUnocssRuntime from "@unocss/runtime";
import unocssConfig from "@flowdev/unocss";

initUnocssRuntime({
  autoPrefix: true,
  defaults: unocssConfig,
});

const IndexView = React.lazy(() => import("./views/IndexView"));
const SettingsView = React.lazy(() => import("./views/SettingsView"));
const RoutineView = React.lazy(() => import("./views/RoutineView"));
const TestView = React.lazy(() => import("./views/TestView"));
const NotFoundView = React.lazy(() => import("./views/NotFoundView"));

const router = createBrowserRouter([
  { path: "/plan", element: <div>Plan</div> }, // TODO: implement public route later
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
    children: [
      { path: "/", element: <IndexView /> },
      { path: "/settings", element: <SettingsView /> },
      { path: "/routine/:routineId/:routineStep", element: <RoutineView /> },
    ],
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
