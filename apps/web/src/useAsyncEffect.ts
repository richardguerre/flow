import { useEffect } from "react";

export const useAsyncEffect = (fn: () => Promise<void>, deps: React.DependencyList) => {
  useEffect(() => {
    fn();
  }, deps);
};
