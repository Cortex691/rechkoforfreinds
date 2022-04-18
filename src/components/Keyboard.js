import React, { useEffect } from "react";
import { keys } from "../constants/constants";
import classes from "./Keyboard.module.css";

const Keyboard = ({ boardData, handleKeyPress }) => {
  function handleKeyboard(key) {
    if (key === "Enter") handleKeyPress("ENTER");
    if (key === "Backspace") handleKeyPress("⌫");
    if (key.length === 1 && key.toLowerCase() !== key.toUpperCase())
      handleKeyPress(key.toUpperCase());
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyPress]);

  return (
    <div className={classes.keyboardRows}>
      {keys.map((item, index) => (
        <div className={classes.row} key={index}>
          {item.map((key, keyIndex) => (
            <button
              key={keyIndex}
              className={`${
                boardData &&
                boardData.correctCharArray.includes(key.toLowerCase())
                  ? classes.keyCorrect
                  : boardData &&
                    boardData.presentCharArray.includes(key.toLocaleLowerCase())
                  ? classes.keyPresent
                  : boardData &&
                    boardData.absentCharArray.includes(key.toLowerCase())
                  ? classes.keyAbsent
                  : ""
              } `}
              onClick={() => {
                handleKeyPress(key);
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
