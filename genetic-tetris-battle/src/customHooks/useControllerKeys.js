// Inspired from https://itnext.io/how-not-to-interact-with-your-web-app-with-a-ps4-controller-a3e3036a2f6e

import { useState, useEffect } from "react";

/**
 * Custom hook that returns true if the given ps4 controller keys are pressed
 *
 * Default keys are set
 */
const useControllerKeys = ({
  upKey = 12,
  leftKey = 14,
  downKey = 13,
  rightKey = 15,
  rotateLeftKey = 1,
  rotateRightKey = 0,
}) => {
  // Keep track of keys state
  const [isUp, setIsUp] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [isRotateLeft, setIsRotateLeft] = useState(false);
  const [isRotateRight, setIsRotateRight] = useState(false);

  // Event handlers
  const onChange = ({ button, key }) => {
    if (key === upKey) setIsUp(button.pressed ? true : false);
    if (key === leftKey) setIsLeft(button.pressed ? !isLeft : false);
    if (key === downKey) setIsDown(button.pressed ? !isDown : false);
    if (key === rightKey) setIsRight(button.pressed ? !isRight : false);
    if (key === rotateLeftKey) setIsRotateLeft(button.pressed ? true : false);
    if (key === rotateRightKey) setIsRotateRight(button.pressed ? true : false);
  };

  useEffect(() => {
    const refreshRate = 5;

    const interval = setInterval(() => {
      // Returns up to 4 gamepads.
      const gamepad = navigator.getGamepads()[0];

      if (gamepad == null) {
        return () => clearInterval(interval);
      }

      // Filter out only the buttons which are pressed
      gamepad.buttons
        .map((button, key) => ({ button, key }))
        .forEach(({ button, key }) => onChange({ button, key }));
    }, refreshRate);

    return () => clearInterval(interval);
  });

  return {
    isUp,
    isLeft,
    isDown,
    isRight,
    setIsDown,
    isRotateLeft,
    isRotateRight,
  };
};

export default useControllerKeys;
