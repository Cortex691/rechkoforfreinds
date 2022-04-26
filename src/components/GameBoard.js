import { useState, useEffect, useMemo } from "react";

import validWords from "../validWords";
// import classes from "./Game.module.css";
import "../App.css";
import Keyboard from "./Keyboard";
import Modal from "./Modal";

const GameBoard = (props) => {
  const [modalMsg, setModalMsg] = useState(null);
  const [boardData, setBoardData] = useState(
    JSON.parse(localStorage.getItem(`board-data-${props.targetWord}`))
  );
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [charArray, setCharArray] = useState([]);

  const resetBoard = () => {
    let newBoardData = {
      ...boardData,
      solution: props.targetWord,
      rowIndex: 0,
      boardWords: [],
      boardRowStatus: [],
      presentCharArray: [],
      absentCharArray: [],
      correctCharArray: [],
      status: "IN_PROGRESS",
    };
    setBoardData(newBoardData);
    localStorage.setItem(
      `board-data-${props.targetWord}`,
      JSON.stringify(newBoardData)
    );
  };

  const handleMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  const enterBoardWord = (word) => {
    let boardWords = boardData.boardWords;
    let boardRowStatus = boardData.boardRowStatus;
    let solution = props.targetWord;
    let presentCharArray = boardData.presentCharArray;
    let absentCharArray = boardData.absentCharArray;
    let correctCharArray = boardData.correctCharArray;
    let rowIndex = boardData.rowIndex;
    let rowStatus = [];
    let matchCount = 0;
    let status = boardData.status;

    for (var index = 0; index < word.length; index++) {
      if (solution.charAt(index) === word.charAt(index)) {
        matchCount++;
        rowStatus.push("correct");
        if (!correctCharArray.includes(word.charAt(index)))
          correctCharArray.push(word.charAt(index));
        if (presentCharArray.indexOf(word.charAt(index)) !== -1)
          presentCharArray.splice(
            presentCharArray.indexOf(word.charAt(index)),
            1
          );
      } else if (solution.includes(word.charAt(index))) {
        rowStatus.push("present");
        if (
          !correctCharArray.includes(word.charAt(index)) &&
          !presentCharArray.includes(word.charAt(index))
        )
          presentCharArray.push(word.charAt(index));
      } else {
        rowStatus.push("absent");
        if (!absentCharArray.includes(word.charAt(index)))
          absentCharArray.push(word.charAt(index));
      }
    }
    if (matchCount === 5) {
      status = "WIN";

      setModalMsg("Браво!");
    } else if (rowIndex + 1 === 6) {
      status = "LOST";
      setModalMsg("Изгубили сте.");
    }
    boardRowStatus.push(rowStatus);
    boardWords[rowIndex] = word;
    let newBoardData = {
      ...boardData,
      boardWords: boardWords,
      boardRowStatus: boardRowStatus,
      rowIndex: rowIndex + 1,
      status: status,
      presentCharArray: presentCharArray,
      absentCharArray: absentCharArray,
      correctCharArray: correctCharArray,
    };
    setBoardData(newBoardData);
    localStorage.setItem(
      `board-data-${props.targetWord}`,
      JSON.stringify(newBoardData)
    );
  };

  const enterCurrentText = (word) => {
    let boardWords = boardData.boardWords;
    let rowIndex = boardData.rowIndex;
    boardWords[rowIndex] = word;
    let newBoardData = { ...boardData, boardWords: boardWords };
    setBoardData(newBoardData);
  };

  const handleKeyPress = (key) => {
    if (boardData.rowIndex > 5 || boardData.status === "WIN") return;
    if (key === "ЕНТЕР") {
      if (charArray.length === 5) {
        let word = charArray.join("").toLowerCase();
        if (!validWords.includes(word)) {
          handleError();
          handleMessage("Ријеч није на листи.");
          return;
        }
        enterBoardWord(word);
        setCharArray([]);
      } else {
        handleMessage("Ријеч мора имати 5 слова.");
      }
      return;
    }
    if (key === "Дел") {
      charArray.splice(charArray.length - 1, 1);
      setCharArray([...charArray]);
    } else if (charArray.length < 5) {
      charArray.push(key);
      setCharArray([...charArray]);
    }
    enterCurrentText(charArray.join("").toLowerCase());
  };

  useEffect(() => {
    if (!boardData || !boardData.solution) {
      let newBoardData = {
        ...boardData,
        solution: props.targetWord,
        rowIndex: 0,
        boardWords: [],
        boardRowStatus: [],
        presentCharArray: [],
        absentCharArray: [],
        correctCharArray: [],
        status: "IN_PROGRESS",
      };
      setBoardData(newBoardData);
      localStorage.setItem(
        `board-data-${props.targetWord}`,
        JSON.stringify(newBoardData)
      );
    }
  }, [boardData, props.targetWord]);

  const closeModal = () => {
    setModalMsg();
  };

  return (
    <div className="container">
      <p className="para">Ријешите ријеч коју вам је задао/ла {props.name}.</p>
      {message && <div className="message">{message}</div>}
      {modalMsg && (
        <Modal
          closeModal={closeModal}
          message={modalMsg}
          word={props.targetWord}
        ></Modal>
      )}
      <div className="cube">
        {[0, 1, 2, 3, 4, 5].map((row, rowIndex) => (
          <div
            className={`cube-row ${
              boardData && row === boardData.rowIndex && error & "error"
            }`}
          >
            {[0, 1, 2, 3, 4].map((column, letterIndex) => (
              <div
                key={letterIndex}
                className={`letter ${
                  boardData && boardData.boardRowStatus[row]
                    ? boardData.boardRowStatus[row][column]
                    : ""
                }`}
              >
                {boardData &&
                  boardData.boardWords[row] &&
                  boardData.boardWords[row][column]}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="bottom">
        <Keyboard boardData={boardData} handleKeyPress={handleKeyPress} />
      </div>
    </div>
  );
};

export default GameBoard;
