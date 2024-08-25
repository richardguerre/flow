import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider, redirect } from "react-router-dom";
import { LOCAL_STORAGE_USER_TOKEN_KEY } from "@flowdev/mobile-pwa/relay/environment";
import unocssConfig from "@flowdev/unocss";
import { Providers } from "@flowdev/mobile-pwa/components/Providers";
import { ViewErrorBoundary } from "@flowdev/mobile-pwa/components/ViewErrorBoundary";
import { SuspenseLoadingView } from "@flowdev/ui/Loading";
import initUnocssRuntime from "@unocss/runtime";

initUnocssRuntime({
  autoPrefix: true,
  defaults: unocssConfig,
});

const IndexView = React.lazy(() => import("./views/IndexView"));
const LoginView = React.lazy(() => import("./views/LoginView"));
const TestView = React.lazy(() => import("./views/TestView"));
const NotFoundView = React.lazy(() => import("./views/NotFoundView"));

const router = createBrowserRouter([
  {
    /**
     * This is the parent route for all routes that require SuspenseLoadingView.
     */
    path: "/",
    element: (
      <SuspenseLoadingView>
        <Outlet />
      </SuspenseLoadingView>
    ),
    children: [
      {
        /**
         * This is the parent route for all routes requiring authentication.
         * If the user is not authenticated, they will be redirected to the login page.
         */
        path: "",
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
            <Outlet />
          </ViewErrorBoundary>
        ),
        children: [{ path: "", element: <IndexView /> }],
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<></>}>
        <LoginView />
      </Suspense>
    ),
  },
  { path: "/test", element: <TestView /> },
  { path: "*", element: <NotFoundView /> },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>,
);
