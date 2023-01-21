import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "virtual:windi.css";
import { RelayEnvironmentProvider } from "@/relay/environment";

const IndexPage = React.lazy(() => import("./pages/IndexPage"));
const TestPage = React.lazy(() => import("./pages/TestPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   component: () => import("./pages/HomePage").then((m) => m.HomePage),
  // },
  {
    path: "/",
    element: (
      <RelayEnvironmentProvider>
        <Outlet />
      </RelayEnvironmentProvider>
    ),
    children: [{ path: "/", element: <IndexPage /> }],
  },
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
