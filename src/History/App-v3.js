import { useState, useRef, useEffect } from "react";
import { Gameboard } from "./Gameboard";
import { Player } from "./Player";
import { Result } from "./Result";
import { DiceResultSorter } from "./DiceResultSorter";
import { Decisions } from "./Decisions";
import { Modal } from "./Modal";
import { Rules } from "./Rules";

export default function App() {
  const timerRef = useRef(null);
  const [gameState, setGameState] = useState({
    active: 1,
    activeButtons: false,
    isRolling: false,
    hasBusted: false,
    completedRow: [],
    tempCompleted: [],
    commitDice: {},
    logArray: [],
    winner: null,
    moves: [3, 5, 7, 9, 11, 13, 11, 9, 7, 5, 3],
  });

  const [showModal, setShowModal] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [playerArray, setPlayerArray] = useState([]);
  const [diceArray, setDiceArray] = useState([]);

  const setOfDice = useRef([]);

  function setOfDiceHandler(input) {
    timerRef.current = null;
    setOfDice.current = input;
  }

  const handledArray = DiceResultSorter(
    setOfDice.current,
    [...gameState.completedRow, ...gameState.tempCompleted],
    gameState.commitDice,
    gameState.moves,
    playerArray[gameState.active - 1]?.selected
  );

  useEffect(() => {
    if (timerRef.current)
      return () => {
        clearTimeout(timerRef.current);
      };
    if (!handledArray) return;
    if (gameState.hasBusted === true) return;
    const bustCount = handledArray?.filter(
      (el) => el.renderCode === "d"
    ).length;
    if (bustCount < 3) return;
    setGameState({
      ...gameState,
      hasBusted: true,
      logArray: [
        ...gameState.logArray,
        [playerArray[gameState.active - 1], "busted"],
      ],
    });
    timerRef.current = setTimeout(() => {
      setGameState((gameState) => ({
        ...gameState,
        hasBusted: false,
        isRolling: false,
        activeButtons: true,
        active: playerArray[gameState.active] ? gameState.active + 1 : 1,
        commitDice: [],
      }));
      setDiceArray([]);
    }, 3500);
  }, [gameState, handledArray, playerArray]);

  function closeModalHandler(e) {
    if (
      e.target.className.includes("dialog-wrapper") ||
      e.target.className.includes("round-button")
    )
      setShowModal(false);
    setShowRules(false);
  }

  return (
    <div className="page-container">
      <Gameboard
        gameState={gameState}
        setGameState={setGameState}
        playerArray={playerArray}
      />
      <section className="admin-container">
        <div className="title-container">
          <button className="round-button" onClick={() => setShowRules(true)}>
            ?
          </button>
          <p className="title" style={{ fontSize: "3.5rem" }}>
            Can't Stop
          </p>
          <p style={{ fontSize: "1.2rem" }}>a Sid Sackson game</p>
        </div>
        <div className="player-area">
          {playerArray.map((el, i) => {
            if (!el || !el.name) return "";
            return (
              <Player
                playerName={el.name}
                playerNumber={i + 1}
                stars={playerArray[i].completed.length}
                backgroundColor={el.color}
                key={el.name + el.color}
                isActive={i + 1 === gameState.active}
                winner={gameState.winner === i}
              />
            );
          })}
        </div>
        <div className="game-log scrollbar">
          {[...gameState.logArray].reverse().map((el, i) => (
            <p
              key={i}
              style={{
                fontWeight: el[1][0] === "completed" ? "bold" : "normal",
              }}
            >
              <span style={{ color: el[0].color }}> {el[0].name}</span>{" "}
              {el[1] === "busted"
                ? "couldn't continue, and lost all progress made this turn"
                : el[1][0] === "completed"
                ? `has won row ${el[1][1].join(" and ")} !!`
                : `advanced on column ${el[1].join(" and ")}`}
            </p>
          ))}
        </div>
        <Decisions
          setShowModal={setShowModal}
          gameState={gameState}
          setGameState={setGameState}
          diceArray={diceArray}
          setDiceArray={setDiceArray}
          setOfDiceHandler={setOfDiceHandler}
          playerArray={playerArray}
          setPlayerArray={setPlayerArray}
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
                gameState={gameState}
                setGameState={setGameState}
                playerArray={playerArray}
                setDiceArray={setDiceArray}
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
      {showRules && <Rules closeModalHandler={closeModalHandler} />}
    </div>
  );
}
