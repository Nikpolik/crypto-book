import { useState, useEffect } from "react";

const supportsMatchMedia =
  typeof window !== "undefined" && typeof window.matchMedia !== "undefined";

const useMediaQuery = (query: string) => {
  const mediaQuery = supportsMatchMedia ? window.matchMedia(query) : null;
  const [match, setMatch] = useState(mediaQuery && mediaQuery.matches);

  useEffect(() => {
    if (!mediaQuery) return;

    const handler = () => setMatch(!!mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return match;
};

export default useMediaQuery;
