import React, { useState, useEffect } from "react";

const text = "My name is Ashish Debnath";
const speed = 50;
const infinite = false;

const Typewriter = () => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: any;

    if (currentIndex <= text.length - 1) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, speed);
    } else if (infinite) {
      // ADD THIS CHECK
      setCurrentIndex(0);
      setCurrentText("");
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, speed, infinite, text]);

  return <span>{currentText}</span>;
};

export default Typewriter;
