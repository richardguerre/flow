import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, redirect, RouterProvider } from "react-router-dom";
import {
  LOCAL_STORAGE_USER_TOKEN_KEY,
  RelayEnvironmentProvider,
} from "@flowdev/web/relay/environment";
import initUnocssRuntime from "@unocss/runtime";
import unocssConfig from "@flowdev/unocss";
import { Navbar } from "@flowdev/web/components/Navbar";
import { getClosestRoutineRoutePathAndName } from "@flowdev/web/views/RoutineView";
import { Providers } from "@flowdev/web/components/Providers";

initUnocssRuntime({
  autoPrefix: true,
  defaults: unocssConfig,
});
// disable unocss runtime observer as we already extract styles in jsx factory (see @flowdev/react package)
window.__unocss_runtime?.toggleObserver(false);

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
        <div className="flex">
          <Navbar />
          <Outlet />
        </div>
      </RelayEnvironmentProvider>
    ),
    children: [
      { path: "/", element: <IndexView /> },
      { path: "/settings", element: <SettingsView /> },
      { path: "/routine/:routineId/:routineStep", element: <RoutineView /> },
      {
        path: "/routine",
        loader: async () => {
          const closestRoutine = await getClosestRoutineRoutePathAndName();
          if (!closestRoutine) return redirect("/routine/1/1"); // should never happen, but just in case
          return redirect(closestRoutine.path);
        },
      },
    ],
  },
  { path: "/login", element: <TestView /> },
  { path: "/test", element: <TestView /> },
  { path: "*", element: <NotFoundView /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <React.Suspense fallback="...">
        <RouterProvider router={router} />
      </React.Suspense>
    </Providers>
  </React.StrictMode>
);
