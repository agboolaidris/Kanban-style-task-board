import { useEffect, useRef } from "react";

/**
 * Custom hook that triggers a callback when a click is detected outside of the referenced element.
 *
 * @template T - The type of the HTML element.
 * @param {() => void} callback - The function to call when a click outside the referenced element is detected.
 * @returns {React.RefObject<T>} - A ref object to be attached to the element to detect outside clicks.
 */

export function useOutsideClick<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback]);

  return ref;
}
