import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, redirect, RouterProvider } from "react-router-dom";
import { LOCAL_STORAGE_USER_TOKEN_KEY } from "@flowdev/web/relay/environment";
import initUnocssRuntime from "@unocss/runtime";
import unocssConfig from "@flowdev/unocss";
import { Navbar } from "@flowdev/web/components/Navbar";
import { getClosestRoutineRoutePathAndName } from "@flowdev/web/views/RoutineView";
import { Providers } from "@flowdev/web/components/Providers";
import { ViewErrorBoundary } from "@flowdev/web/components/ViewErrorBoundary";

initUnocssRuntime({
  autoPrefix: true,
  defaults: unocssConfig,
});
// disable unocss runtime observer as we already extract styles in jsx factory (see @flowdev/react package)
window.__unocss_runtime?.toggleObserver(false);

const IndexView = React.lazy(() => import("./views/IndexView"));
const SettingsView = React.lazy(() => import("./views/SettingsView"));
const GeneralSettingsView = React.lazy(() => import("./views/GeneralSettingsView"));
const TaskSettingsView = React.lazy(() => import("./views/TaskSettingsView"));
const RoutineSettingsView = React.lazy(() => import("./views/RoutineSettingsView"));
const BrowsePluginsView = React.lazy(() => import("./views/BrowsePluginsView"));
// const PluginSettingsView = React.lazy(() => import("./views/PluginSettingsView"));
const RoutineView = React.lazy(() => import("./views/RoutineView"));
const LoginView = React.lazy(() => import("./views/LoginView"));
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
      const token = window.localStorage.getItem(LOCAL_STORAGE_USER_TOKEN_KEY);
      if (!token) {
        return redirect("/login");
      }
      console.info(`Authenticated with token: ${token}`);
      return null;
    },
    element: (
      <ViewErrorBoundary>
        <div className="flex">
          <Navbar />
          <Outlet />
        </div>
      </ViewErrorBoundary>
    ),
    children: [
      { path: "/", element: <IndexView /> },
      { path: "browse-plugins", element: <BrowsePluginsView /> },
      {
        path: "/settings",
        element: <SettingsView />,
        children: [
          { path: "", element: <GeneralSettingsView /> }, // show general settings as default
          { path: "general", element: <GeneralSettingsView /> },
          { path: "tasks", element: <TaskSettingsView /> },
          { path: "routines", element: <RoutineSettingsView /> },
          { path: "browse-plugins", element: <BrowsePluginsView /> },
          // { path: "plugin/:pluginId", element: <PluginSettingsView /> },
          { path: "*", element: <NotFoundView /> },
        ],
      },
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
  { path: "/login", element: <LoginView /> },
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
