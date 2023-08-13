import { useMatches } from "react-router-dom";

export const useActiveLink = (to: string) => {
  let matches = useMatches();
  if (matches[0].pathname === "/") matches = matches.slice(1); // ignore the first match if it's the root path
  return !!matches.find((match) => match.pathname === to);
};
