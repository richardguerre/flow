import { ErrorBoundary } from "@flowdev/error-boundary";
import { Button } from "@flowdev/ui/Button";
import { Link, useLocation } from "react-router-dom";
import { LOCAL_STORAGE_USER_TOKEN_KEY } from "../relay/environment";

type Props = {
  children: React.ReactNode;
};

export const ViewErrorBoundary = (props: Props) => {
  const location = useLocation();
  return (
    <ErrorBoundary
      resetKeys={[location.pathname]}
      fallbackRender={({ error }) => {
        console.log(error);
        const unauthenticatedError = error.cause?.find(
          (e: any) => e.extensions?.code === "UNAUTHENTICATED",
        );
        const errorMessages = error.message.split("\n").map((m: string) => (
          <p key={m} className="text-foreground-700">
            {m}
          </p>
        ));

        if (unauthenticatedError) {
          window.localStorage.removeItem(LOCAL_STORAGE_USER_TOKEN_KEY);
        }
        return (
          <div className="flex h-screen w-full items-center justify-center">
            <div className="text-center">
              {unauthenticatedError ? (
                <>
                  <h1 className="text-2xl font-bold">Hmm... seems you're logged out!</h1>
                  {errorMessages}
                  <div className="mt-4">
                    <Link to="/login">
                      <Button lg>Login</Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">Something went wrong</h1>
                  {errorMessages}
                </>
              )}
            </div>
          </div>
        );
      }}
    >
      {props.children}
    </ErrorBoundary>
  );
};
