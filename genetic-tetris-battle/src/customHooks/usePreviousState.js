import { useRef, useEffect } from "react";

/**
 * Custom hook to store the value in a ref in
 * order to keep it after re-render (used in useEffects conditions)
 * @param {*} value
 */
const usePreviousState = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePreviousState;
