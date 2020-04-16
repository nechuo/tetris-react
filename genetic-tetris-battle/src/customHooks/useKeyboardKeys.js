// Inspired from https://dev.to/spaciecat/keyboard-input-with-react-hooks-3dkm

import { useState, useEffect } from "react";

/**
 * Custom hook that returns true if the given keyboard keys names are pressed
 *
 * Default key names are set
 */
const useKeyboardKeys = ({
  upKey = "ArrowUp",
  rotateLeftKey = "w",
  rotateRightKey = "x",
  leftKey = "ArrowLeft",
  downKey = "ArrowDown",
  rightKey = "ArrowRight",
}) => {
  // Keep track of keys state
  const [isUp, setIsUp] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isRotateLeft, setIsRotateLeft] = useState(false);
  const [isRotateRight, setIsRotateRight] = useState(false);

  // Does an event match the key we're watching?
  const match = (event, key) => key.toLowerCase() === event.key.toLowerCase();

  // Event handlers
  const onChange = (event) => {
    const isKeyDown = event.type === "keydown";
    if (match(event, upKey)) setIsUp(isKeyDown ? !isUp : false);
    if (match(event, leftKey)) setIsLeft(isKeyDown ? !isLeft : false);
    if (match(event, downKey)) setIsDown(isKeyDown ? !isDown : false);
    if (match(event, rightKey)) setIsRight(isKeyDown ? !isRight : false);
    if (match(event, rotateLeftKey)) setIsRotateLeft(isKeyDown ? true : false);
    if (match(event, rotateRightKey))
      setIsRotateRight(isKeyDown ? true : false);
  };

  // Bind and unbind events
  useEffect(() => {
    window.addEventListener("keyup", onChange);
    window.addEventListener("keydown", onChange);
    return () => {
      window.removeEventListener("keyup", onChange);
      window.removeEventListener("keydown", onChange);
    };
  });

  return {
    isLeft,
    isRight,
    isUp,
    isDown,
    isRotateLeft,
    isRotateRight,
  };
};

export default useKeyboardKeys;
