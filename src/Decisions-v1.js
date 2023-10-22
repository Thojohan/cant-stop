import { useEffect, useRef, useState } from "react";

export function Decisions({ completedRow }) {
  const [isRolling, setIsRolling] = useState(false);
  const [diceArray, setDiceArray] = useState([]);

  const setOfDice = useRef([]);

  function continueHandler() {
    setIsRolling(true);
    const dice = Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1)
      .sort((a, b) => a - b);

    setDiceArray(dice);

    const count = dice.reduce((acc, el, i) => {
      if (dice[i - 1] === el && dice[i - 2] === el) return acc + 2;
      if (dice[i - 1] === el) return acc + 1;
      return acc;
    }, 0);

    const content = [
      {
        First: dice[0] + dice[1],
        Second: dice[2] + dice[3],
        Array1: [dice[0], dice[1]],
        Array2: [dice[2], dice[3]],
      },
      count < 3 && {
        First: dice[0] + dice[2],
        Second: dice[1] + dice[3],
        Array1: [dice[0], dice[2]],
        Array2: [dice[1], dice[3]],
      },
      count < 2 && {
        First: dice[0] + dice[3],
        Second: dice[1] + dice[2],
        Array1: [dice[0], dice[3]],
        Array2: [dice[1], dice[2]],
      },
    ].filter((el) => el);

    setOfDice.current = content;
  }

  function stopHandler() {
    setIsRolling(false);
  }

  return (
    <div className="decision-container">
      {diceArray.length > 0 && (
        <>
          <div className="dice-container">
            <img
              className="die"
              src={`./${diceArray[0]}-transparant.png`}
              alt="D1"
            />
            <img
              className="die"
              src={`./${diceArray[1]}-transparant.png`}
              alt="D2"
            />
            <img
              className="die"
              src={`./${diceArray[2]}-transparant.png`}
              alt="D3"
            />
            <img
              className="die"
              src={`./${diceArray[3]}-transparant.png`}
              alt="D4"
            />
          </div>
          <div className="result-container">
            {setOfDice.current.map((el, index) => {
              return (
                <Result
                  completedRow={completedRow}
                  diceArray={diceArray}
                  el={el}
                  index={index}
                  key={Date.now + index}
                />
              );
            })}
          </div>
        </>
      )}
      <div className="button-container">
        <button>New Game</button>
        <button onClick={continueHandler}>
          {!isRolling ? "Roll dice" : "Continue"}
        </button>
        <button onClick={stopHandler}>Stop</button>
      </div>
    </div>
  );
}

function Result({ el, completedRow = [7, 4, 3, 5, 6] }) {
  return (
    <div className="result">
      {completedRow.find((num) => num === +el.First) ? (
        ""
      ) : (
        <div className="result-line">
          <p>{`Advance on ${el.First}`}</p>
          <img
            className="die"
            src={`./${el.Array1[0]}-transparant.png`}
            alt=""
          />
          <img
            className="die"
            src={`./${el.Array1[1]}-transparant.png`}
            alt=""
          />
        </div>
      )}
      {completedRow.find((num) => num === +el.Second) ? (
        ""
      ) : (
        <div className="result-line">
          <p>{`Advance on ${el.Second}`}</p>
          <img
            className="die"
            src={`./${el.Array2[0]}-transparant.png`}
            alt=""
          />
          <img
            className="die"
            src={`./${el.Array2[1]}-transparant.png`}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
