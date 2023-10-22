import { useState, useRef, useEffect } from "react";
import { Gameboard } from "./Gameboard";
// import Initialize from "./Initialize";
import { Player } from "./Player";
import { DiceResultSorter } from "./DiceResultSorter";
import { Decisions } from "./Decisions";
import { Result } from "./Result";
import { Modal } from "./Modal";
import { ButtonLogic } from "./ButtonLogic";

export default function App() {
  const [gameState, setGameState] = useState({
    active: 1,
    isPlaying: false,
    isRolling: false,
    bustCount: 0,
    completedRow: [6, 7],
    commitDice: { 8: 1, 6: 2 },
    logArray: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);
  const [diceArray, setDiceArray] = useState([]);

  const setOfDice = useRef([]);
  const bustCount = useRef(0);

  function setOfDiceHandler(input) {
    setOfDice.current = input;
  }

  function updateBustCount(input) {
    if ((input = "increase")) bustCount.current = bustCount.current + 1;
    if ((input = "reset")) bustCount.current = 0;
  }

  const handledArray = DiceResultSorter(
    setOfDice.current,
    gameState.completedRow,
    gameState.commitDice
  );

  console.log(handledArray);

  useEffect(() => {
    if (!handledArray) return;
    console.log(handledArray);
  }, [handledArray]);

  // function updateBustCount() {
  //   bustCount.current = bustCount.current + 1;
  //   console.log(bustCount);
  //   if (bustCount.current < 3) return;
  //   setGameState((gameState) => ({
  //     ...gameState,
  //     isPlaying: false,
  //   }));
  //   setTimeout(() => {
  //     bustCount.current = 0;
  //
  //     console.log("yo yo yo");
  //     setGameState((gameState) => ({
  //       ...gameState,
  //       isRolling: false,
  //       isPlaying: true,
  //       active: playerArray[gameState.active] ? gameState.active + 1 : 1,
  //     }));
  //     setDiceArray([]);
  //   }, 4000);
  //   console.log(gameState);
  // }

  // const direction = Initialize();

  function handleNewGame() {
    setShowModal(true);
  }

  function closeModalHandler(e) {
    if (
      e.target.className.includes("dialog-wrapper") ||
      e.target.className.includes("round-button")
    )
      setShowModal(false);
  }

  return (
    <div className="page-container">
      <Gameboard gameState={gameState} />
      <section className="admin-container">
        <div className="title-container">
          <p className="title" style={{ fontSize: "3.5rem" }}>
            Can't Stop
          </p>
          <p style={{ fontSize: "1.2rem" }}>a Sid Sackson game</p>
        </div>
        <div className="player-area">
          {playerArray.map((el, i) => {
            if (!el || !el.name || !gameState.isPlaying) return "";
            return (
              <Player
                playerName={el.name}
                playerNumber={i + 1}
                backgroundColor={el.color}
                key={el.name + el.color}
                isActive={i + 1 === gameState.active}
              />
            );
          })}
        </div>
        <div className="game-log">
          {[...gameState.logArray].reverse().map((el, i) => (
            <p key={new Date().getTime() + el[i].color}>
              <span style={{ color: el[0].color }}> {el[0].name}</span>{" "}
              {el.length > 0
                ? `advanced on ${el[1].join(" and ")}`
                : "couldn't continue, and lost all progress"}
            </p>
          ))}
        </div>
        <Decisions
          updateBustCount={updateBustCount}
          handleNewGame={handleNewGame}
          gameState={gameState}
          setGameState={setGameState}
          diceArray={diceArray}
          setDiceArray={setDiceArray}
          setOfDiceHandler={setOfDiceHandler}
        >
          {setOfDice.current.length > 0 &&
            setOfDice.current.map((el, i) => (
              <Result
                el={el}
                setOfDice={setOfDice}
                handledArray={handledArray}
                sorted={handledArray[i].sorted}
                render={handledArray[i].renderCode}
                alreadyCommited={gameState.commitDice}
              />
            ))}
        </Decisions>
      </section>
      {showModal && (
        <Modal
          setPlayerArray={setPlayerArray}
          setShowModal={setShowModal}
          setGameState={setGameState}
          gameState={gameState}
          closeModalHandler={closeModalHandler}
        />
      )}
    </div>
  );
}
