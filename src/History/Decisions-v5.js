export function Decisions({
  handleNewGame,
  gameState,
  setGameState,
  diceArray,
  setDiceArray,
  setOfDiceHandler,
  playerArray,
  setPlayerArray,
  children,
}) {
  function continueHandler() {
    setGameState({ ...gameState, isRolling: true });

    const dice = Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1)
      .sort((a, b) => a - b);

    setDiceArray(dice);

    const content = [
      {
        First: dice[0] + dice[1],
        Second: dice[2] + dice[3],
        Array1: [dice[0], dice[1]],
        Array2: [dice[2], dice[3]],
      },
      {
        First: dice[3] + dice[1],
        Second: dice[2] + dice[0],
        Array1: [dice[3], dice[1]],
        Array2: [dice[2], dice[0]],
      },
      {
        First: dice[2] + dice[1],
        Second: dice[3] + dice[0],
        Array1: [dice[2], dice[1]],
        Array2: [dice[3], dice[0]],
      },
    ].filter((el) => el);

    setOfDiceHandler(content);
  }
  function stopHandler() {
    //     const completed = Object.entries(gameState.commitDice).filter(([key, val]) => )

    const completed = Object.entries(gameState.commitDice).filter(
      ([key, value]) => +value >= +gameState.moves.at(+key - 2)
    );

    const newPlayerArray = playerArray.map((el, i) =>
      i === gameState.active - 1
        ? {
            ...el,
            selected: { ...el.selected, ...gameState.commitDice },
            completed: [...gameState.completed, ...completed],
          }
        : el
    );
    console.log(completed);
    console.log(playerArray);

    setGameState({
      ...gameState,
      isRolling: false,
      active: playerArray[gameState.active] ? gameState.active + 1 : 1,
      commitDice: {},
      tempCompleted: [],
      completedRow: [
        ...gameState.completedRow,
        ...completed.map((el) => +el[0]),
      ],
    });
    setPlayerArray(newPlayerArray);
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
          <div className="result-container">{children}</div>
        </>
      )}
      <div className="button-container">
        <button
          className="main-button"
          onClick={handleNewGame}
          disabled={gameState.hasBusted ? true : false}
        >
          New Game
        </button>
        <button
          className="main-button"
          onClick={continueHandler}
          disabled={!gameState.isPlaying || gameState.hasBusted ? true : false}
        >
          {Object.keys(gameState.commitDice).length < 1
            ? "Roll dice"
            : "Continue"}
        </button>
        <button
          className="main-button"
          onClick={stopHandler}
          disabled={
            !gameState.isPlaying ||
            gameState.hasBusted ||
            Object.keys(gameState.commitDice).length < 1
              ? true
              : false
          }
        >
          Stop
        </button>
      </div>
    </div>
  );
}
