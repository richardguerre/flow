import { useLocation, useMatches } from "react-router-dom";

export const useActiveLink = (props: {
  to: string;
  /** The level of the link in the tree. If it's in the NavBar, it's level 1, if it's in a sub-menu, it's level 2, etc. */
  level: number;
}) => {
  if (props.to === "/") return useLocation().pathname === "/";
  const matches = useMatches();
  const matchesOfLevel = matches.filter(
    (match) => match.pathname?.split("/").length - 1 === props.level,
  );
  const lastMatchOfLevel = matchesOfLevel[matchesOfLevel.length - 1]!;
  return lastMatchOfLevel?.pathname.slice(-5) === props.to.slice(-5);
};
