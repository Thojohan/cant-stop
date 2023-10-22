export function Decisions({
  handleNewGame,
  gameState,
  setGameState,
  diceArray,
  setDiceArray,
  setOfDiceHandler,
  updateBustCount,
  children,
}) {
  function continueHandler() {
    setGameState({ ...gameState, isRolling: true });
    const dice = Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1)
      .sort((a, b) => a - b);

    setDiceArray(dice);
    updateBustCount("reset");

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
    setGameState({ ...gameState, isRolling: false });
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
            {children.map((el, i) => (
              <div className="result-wrapper" key={i}>
                {el}
              </div>
            ))}
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
          {!gameState.isRolling ? "Roll dice" : "Continue"}
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
