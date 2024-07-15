import { useEffect, useState } from "react";
import Card from "./Card";
import "./styles/app.css";

function App() {
  const [bestScore, setBestScore] = useState(0);
  const [numberArray, setNumberArray] = useState([]);
  const [clickedArray, setClickedArray] = useState([]);
  const [numCards, setNumCards] = useState(16);

  useEffect(() => {
    const tempArray = [];
    const startIndex = getRandomInt(1, 100);

    for (let i = startIndex; i < startIndex + numCards; i++) {
      console.log(i);
      tempArray[i - startIndex] = i;
    }

    setNumberArray(tempArray);
  }, []);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addToClickedArray(id) {
    if (!clickedArray.includes(id)) {
      setClickedArray([...clickedArray, id]);
    } else {
      setClickedArray([]);
    }
  }

  function updateBestScore() {
    if (clickedArray.length > bestScore) {
      setBestScore(clickedArray.length);
    }
  }

  function shuffle(array) {
    const tempArray = array;
    console.log("temp len", tempArray.length);
    for (let i = tempArray.length - 1; i > 0; i--) {
      let randomIndex = getRandomInt(0, tempArray.length - 1);
      [tempArray[i], tempArray[randomIndex]] = [
        tempArray[randomIndex],
        tempArray[i],
      ];
      //[x,y] = [y,x] assigns 2 variables at once, effectively swapping!
    }
    console.log(tempArray);
    return tempArray;
  }

  function manageClick(id) {
    addToClickedArray(id);
    updateBestScore();
    console.log(numberArray);
    setNumberArray(shuffle(numberArray));
  }

  return (
    <>
      <div className="text">
        <h1 className="title">Pokemon Memory Game!</h1>
        <h2>Score: {clickedArray.length + "/" + numCards}</h2>
        <h3>Best Score: {bestScore}</h3>
      </div>
      <div className="card-container">
        {numberArray.map((value) => (
          <Card key={value} id={value} onclick={() => manageClick(value)} />
        ))}
      </div>
    </>
  );
}

export default App;
