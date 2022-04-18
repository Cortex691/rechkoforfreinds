import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import GameBoard from "../components/GameBoard";
import { encrypt } from "../prepis";

const GamePage = () => {
  String.prototype.replaceArray = function (find, replace) {
    var replaceString = this;
    var regex;
    for (var i = 0; i < find.length; i++) {
      regex = new RegExp(find[i], "g");
      replaceString = replaceString.replace(regex, replace[i]);
    }
    return replaceString;
  };

  const { wordId } = useParams();
  const { name } = useParams();

  console.log(wordId);

  function decode(str) {
    return str.replace(/.{3}/g, function (c) {
      return String.fromCharCode(c);
    });
  }

  const wordForDecode = decode(wordId);

  const finalWord = encrypt(wordForDecode.toLowerCase());

  return (
    <Layout>
      <GameBoard targetWord={finalWord} name={name} />
    </Layout>
  );
};

export default GamePage;
