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
  const enteredWordRef = useRef();
  const enteredNameRef = useRef();

  function encode(str) {
    return str.replace(/./g, function (c) {
      return ("00" + c.charCodeAt(0)).slice(-3);
    });
  }

  const wordSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredWord = enteredWordRef.current.value;

    if (validWords.includes(enteredWord.toLowerCase())) {
      const wordForNum = await decrypt(enteredWord);
      const encryptedWord = encode(wordForNum);

      setWord(encryptedWord);
      setShowWordBtn(false);

      setErrorWord(false);
    } else {
      setErrorWord(true);
      setTimeout(() => {
        setErrorWord(false);
      }, 3000);
    }
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
    const copyValue = `localhost:3000/${name}/${word}`;
    navigator.clipboard.writeText(copyValue);
    console.log(copyValue);
    setIsLinkCopied(true);
  };

  return (
    <Layout>
      <Paragraph>Направите Речко игру користећи вашу ријеч!</Paragraph>
      <Paragraph>Унесите ријеч са 5 слова.</Paragraph>
      <Note className={classes.note}>*Ријеч мора бити унијета ћирилицом.*</Note>
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
          <Paragraph>Линк за игру је креиран и копиран.</Paragraph>
          <Paragraph>Пошаљите га својим пријатељима!</Paragraph>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default StartPage;
