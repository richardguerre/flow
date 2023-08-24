import { ErrorBoundary } from "@flowdev/error-boundary";
import { Button } from "@flowdev/ui/Button";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const ViewErrorBoundary = (props: Props) => {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        const unauthenticatedError = error.cause?.find(
          (e: any) => e.extensions.code === "UNAUTHENTICATED"
        );
        const errorMessages = error.message
          .split("\n")
          .map((m: string) => <p className="text-gray-500">{m}</p>);
        return (
          <div className="flex h-screen items-center justify-center">
            <div className="text-center">
              {unauthenticatedError ? (
                <>
                  <h1 className="text-2xl font-bold">Hmm... seems you're logged out!</h1>
                  {errorMessages}
                  <div className="mt-4">
                    <Link to="/login" className="mt-4">
                      <Button>Login</Button>
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
