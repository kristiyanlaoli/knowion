"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Knowledge Sharing.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Note Taking.")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
