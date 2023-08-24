import { ErrorBoundary as ReactErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";

export const ErrorBoundary = (props: ErrorBoundaryProps) => {
  return <ReactErrorBoundary {...props} />;
};
