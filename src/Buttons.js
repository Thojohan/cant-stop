export function Buttons({
  handleNewGame,
  continueHandler,
  gameState,
  setGameState,
}) {
  function stopHandler() {
    setGameState({ ...gameState, isRolling: false });
  }
  return (
    <div className="button-container">
      <button className="main-button" onClick={handleNewGame}>
        New Game
      </button>
      <button
        className="main-button"
        onClick={continueHandler}
        disabled={gameState.activeButtons ? false : true}
      >
        {!gameState.isRolling ? "Roll dice" : "Continue"}
      </button>
      <button
        className="main-button"
        onClick={stopHandler}
        disabled={gameState.activeButtons ? false : true}
      >
        Stop
      </button>
    </div>
  );
}
