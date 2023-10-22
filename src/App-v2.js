import { useState, useRef, useEffect } from "react";

import { Gameboard } from "./Gameboard";
import { Player } from "./Player";
import { Result } from "./Result";
import { DiceResultSorter } from "./DiceResultSorter";
import { Decisions } from "./Decisions";
import { Modal } from "./Modal";

export default function App() {
  const timerRef = useRef(null);
  const [gameState, setGameState] = useState({
    active: 1,
    isPlaying: false,
    isRolling: false,
    hasBusted: false,
    completedRow: [6, 7, 8, 9, 5],
    commitDice: { 8: 1, 6: 2 },
    logArray: [],
  });

  console.log(timerRef);

  const [showModal, setShowModal] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);
  const [diceArray, setDiceArray] = useState([]);

  const setOfDice = useRef([]);

  function setOfDiceHandler(input) {
    timerRef.current = null;
    setOfDice.current = input;
  }

  const handledArray = DiceResultSorter(
    setOfDice.current,
    gameState.completedRow,
    gameState.commitDice
  );

  useEffect(() => {
    if (timerRef.current) {
      return () => clearTimeout(timerRef.current);
    }
    console.log(handledArray, gameState.hasBusted === true);
    if (!handledArray) return;
    if (gameState.hasBusted === true) return;
    const bustCount = handledArray?.filter(
      (el) => el.renderCode === "d"
    ).length;
    if (bustCount < 3) return;
    setGameState({ ...gameState, hasBusted: true });
    console.log("hei");
    timerRef.current = setTimeout(() => {
      console.log("hei");
      setGameState((gameState) => ({
        ...gameState,
        hasBusted: false,
        isRolling: false,
        active: playerArray[gameState.active] ? gameState.active + 1 : 1,
      }));
      setDiceArray([]);
    }, 3000);
  }, [gameState, handledArray, playerArray]);

  // useEffect(() => {
  //   if (!handledArray) return;
  //   if (gameState.isPlaying === false) return;
  //   if (bustCount.length < 3) return;
  //
  //   timerRef.current = setTimeout(() => {
  //     setGameState((gameState) => ({
  //       ...gameState,
  //       isRolling: false,
  //       isPlaying: true,
  //       bustCount: 0,
  //       active: playerArray[gameState.active] ? gameState.active + 1 : 1,
  //     }));
  //     setDiceArray([]);
  //     bustCount.current = 0;
  //   }, 4000);
  //
  //   return () => clearTimeout(timerRef.current);
  // }, []);
  //
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
                key={i}
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
