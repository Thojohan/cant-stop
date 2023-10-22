import { useRef, useState } from "react";

export function Decisions({
  completedRow,
  handleNewGame,
  setPlayerArray,
  playerArray,
  gameState,
  setGameState,
}) {
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

    const checkedInput = content.filter(
      (el) =>
        completedRow.find((num) => num === +el.Second) &&
        completedRow.find((num) => num === +el.First)
    );
    checkedInput.length === content.length && setIsRolling(false);
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
                  gameState={gameState}
                  setGameState={setGameState}
                  playerArray={playerArray}
                  setPlayerArray={setPlayerArray}
                />
              );
            })}
          </div>
        </>
      )}
      <div className="button-container">
        <button className="main-button" onClick={handleNewGame}>
          New Game
        </button>
        <button
          className="main-button"
          onClick={continueHandler}
          disabled={gameState.isPlaying ? false : true}
        >
          {!isRolling ? "Roll dice" : "Continue"}
        </button>
        <button
          className="main-button"
          onClick={stopHandler}
          disabled={gameState.isPlaying ? false : true}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

function Result({
  el,
  completedRow,
  setPlayerArray,
  gameState,
  playerArray,
  setGameState,
}) {
  const commitArray =
    Object.entries(playerArray[gameState.active - 1]?.selected) || [];
  console.log(commitArray);

  console.log(playerArray[gameState.active - 1]?.selected);

  function inputResult(e) {
    const input = [...e.target.closest(".result").children].map(
      (el) => el.dataset.value
    );

    console.log(gameState.active, playerArray[gameState.active - 1]);
     setPlayerArray(
       playerArray.map((el, i) => {
         if (i === gameState.active - 1)
           return {...el.selected: [...el.selected, ...input].reduce((acc, el) => {
               if (acc.el) return { ...acc, [el]: +el + 1 };
               return { ...acc, [el]: 1 };
             }, {}),
           };
         return el;
       })
     );
    setGameState({
      ...gameState,
      logArray: [
        ...gameState.logArray,
        [playerArray[gameState.active - 1], input],
      ],
    });
    console.log(playerArray);
  }

  const notCompletedArray = [el.First, el.Second].filter(
    (e) => !completedRow.find((num) => +num === +e)
  );

  const oldElementsArray = notCompletedArray.filter((e) =>
    commitArray.find((el) => e !== el)
  );

  console.log(oldElementsArray);

  return (
    <div className="result" onClick={inputResult}>
      {!oldElementsArray.find(
        (num) => num === el.First || commitArray.length < 3
      ) && (
        <div className="result-line" data-value={el.First}>
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

      {!oldElementsArray.find(
        (num) => num === el.Second || commitArray.length < 2
      ) && (
        <div className="result-line" data-value={el.Second}>
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
