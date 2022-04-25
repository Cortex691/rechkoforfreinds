import React, { useState, useRef } from "react";
import Form from "../components/Form";
import Layout from "../components/Layout";
import Paragraph from "../components/Paragraph";
import Note from "../components/Note";
import Button from "../components/Button";
import validWords from "../validWords";
import { decrypt } from "../prepis";

import classes from "./StartPage.module.css";

const StartPage = () => {
  const [word, setWord] = useState(null);
  const [name, setName] = useState(null);
  const [showWordBtn, setShowWordBtn] = useState(true);
  const [showNameBtn, setShowNameBtn] = useState(true);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [errorWord, setErrorWord] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorWordGl, setErrorWordGl] = useState(false);
  const enteredWordRef = useRef();
  const enteredNameRef = useRef();

  function encode(str) {
    return str.replace(/./g, function (c) {
      return ("00" + c.charCodeAt(0)).slice(-3);
    });
  }

  const wordSubmitHandler = async (event) => {
    const latinica = [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      "š",
      "Š",
      "đ",
      "Đ",
      "ž",
      "Ž",
      "č",
      "Č",
      "ć",
      "Ć",
    ];
    event.preventDefault();

    const enteredWord = enteredWordRef.current.value;

    if (latinica.some((slovo) => enteredWord.includes(slovo))) {
      setErrorWordGl(true);
      setErrorWord(false);
      setTimeout(() => {
        setErrorWordGl(false);
      }, 3000);
    } else if (
      !latinica.some((slovo) => enteredWord.includes(slovo)) &&
      !validWords.includes(enteredWord.toLowerCase())
    ) {
      setErrorWordGl(false);
      setErrorWord(true);
      setTimeout(() => {
        setErrorWord(false);
      }, 3000);
    } else if (
      !latinica.some((slovo) => enteredWord.includes(slovo)) &&
      validWords.includes(enteredWord.toLowerCase())
    ) {
      const wordForNum = await decrypt(enteredWord);
      const encryptedWord = encode(wordForNum);

      setWord(encryptedWord);
      setShowWordBtn(false);

      setErrorWord(false);
    }

    // if (latinica.some((slovo) => enteredWord.includes(slovo))) {
    //   setErrorWordGl(true);
    //   setTimeout(() => {
    //     setErrorWordGl(false);
    //   }, 3000);
    // }
    // if (
    //   !latinica.some((slovo) => enteredWord.includes(slovo)) &&
    //   validWords.includes(enteredWord.toLowerCase())
    // ) {
    //   const wordForNum = await decrypt(enteredWord);
    //   const encryptedWord = encode(wordForNum);

    //   setWord(encryptedWord);
    //   setShowWordBtn(false);

    //   setErrorWord(false);
    // }
    // if (!validWords.includes(enteredWord.toLowerCase())) {
    //   setErrorWord(true);
    //   setTimeout(() => {
    //     setErrorWord(false);
    //   }, 3000);
    // }

    //   if (validWords.includes(enteredWord.toLowerCase())) {
    //     const wordForNum = await decrypt(enteredWord);
    //     const encryptedWord = encode(wordForNum);

    //     setWord(encryptedWord);
    //     setShowWordBtn(false);

    //     setErrorWord(false);
    //   } else {
    //     setErrorWord(true);
    //     setTimeout(() => {
    //       setErrorWord(false);
    //     }, 3000);
    //   }
  };

  const nameSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = enteredNameRef.current.value;

    if (enteredName) {
      setName(enteredName);
      setShowNameBtn(false);
    } else {
      setErrorName(true);
      setTimeout(() => {
        setErrorName(false);
      }, 3000);
    }
  };

  const copyHandler = () => {
    console.log(word);
    console.log(name);
    const copyValue = `www.rechkoforfriends.com/${name}/${word}`;
    navigator.clipboard.writeText(copyValue);
    console.log(copyValue);
    setIsLinkCopied(true);
  };

  return (
    <Layout>
      <Paragraph>
        Направите{" "}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.open("https://rechko.com/", "_blank");
          }}
          formTarget="_blank"
          className={classes.rechko}
        >
          Речко
        </button>{" "}
        игру <br></br> користећи вашу ријеч!
      </Paragraph>
      <p className={classes.para}>Унесите ријеч са 5 слова.</p>
      {/* <Paragraph>Унесите ријеч са 5 слова.</Paragraph> */}
      {errorWordGl && (
        <Note className={classes.note}>
          *Ријеч мора бити унијета ћирилицом.*
        </Note>
      )}
      {errorWord && (
        <Note className={classes.note}>*Ријеч није на листи.*</Note>
      )}
      <Form
        placeHolder="Ваша ријеч."
        minL={5}
        maxL={5}
        onSubmit={wordSubmitHandler}
        enteredRef={enteredWordRef}
        showBtn={showWordBtn}
      />

      {errorName && (
        <Note className={classes.note}>
          *Поље са именом не смије бити празно.*
        </Note>
      )}
      {word && (
        <Form
          placeHolder="Ваше име."
          minL={1}
          maxL={9}
          onSubmit={nameSubmitHandler}
          enteredRef={enteredNameRef}
          showBtn={showNameBtn}
        />
      )}

      {word && name && (
        <Button disabled={isLinkCopied} onClick={copyHandler}>
          {!isLinkCopied ? "Копирајте линк" : "Линк је копиран"}
        </Button>
      )}
      {isLinkCopied && (
        <React.Fragment>
          <p className={classes.para}>Линк за игру је креиран и копиран.</p>
          <p className={classes.para}>Пошаљите га својим пријатељима!</p>
        </React.Fragment>
      )}
      <p className={classes.para1}>
        by
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            window.open("https://nd-portfolio.netlify.app/", "_blank");
          }}
          formTarget="_blank"
          className={classes.cortex}
        >
          cortex
        </button>
      </p>
    </Layout>
  );
};

export default StartPage;
