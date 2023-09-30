import { useState, useEffect, useRef } from "react";

export const useDebounce = <T>(
  value: T,
  delay: number,
  onUpdate?: (value: T) => void | Promise<void>
) => {
  const timerRef = useRef<NodeJS.Timeout>();
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [debouncing, setDebouncing] = useState(false);

  const cancelDebounce = () => {
    clearTimeout(timerRef.current);
  };

  useEffect(() => {
    setDebouncing(true);
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
      setDebouncing(false);
      onUpdate?.(value);
    }, delay);

    return () => {
      cancelDebounce();
    };
  }, [JSON.stringify(value), delay]);

  return [debouncedValue, debouncing, cancelDebounce] as const;
};
