import { useEffect, useState } from "react";

const defaultColors = ["#FE0000", "#0D3DFF", "#f5e042", "#23EC03"];

export function Modal({
  closeModalHandler,
  setGameState,
  setShowModal,
  gameState,
  setPlayerArray,
}) {
  const [inputArray, setInputArray] = useState([]);
  useEffect(() => {
    document.addEventListener("keypress", closeModalHandler);

    return () => document.addEventListener("keydown", closeModalHandler);
  }, [closeModalHandler]);

  function handleUpdateCount(e) {
    setInputArray(
      Array(parseInt(e.target.value || 0))
        .fill(null)
        .map((_, i) => {
          return { color: defaultColors[i], selected: {}, completed: [] };
        })
    );
  }

  function createGameHandler(e) {
    const filteredArray = inputArray.filter((el) => el.name);
    if (filteredArray.length !== inputArray.length) return;
    setPlayerArray(inputArray);
    setGameState({
      ...gameState,
      active: 1,
      activeButtons: true,
      isRolling: false,
      hasBusted: false,
      completedRow: [],
      tempCompleted: [],
      commitDice: {},
      logArray: [],
      winner: null,
    });
    setShowModal(false);
  }

  return (
    <div className="modal-wrapper">
      <div className="modal" onClick={closeModalHandler}>
        <div className="dialog-wrapper">
          <div className="dialog-box">
            <button className="round-button" onClick={closeModalHandler}>
              X
            </button>
            <h2>New Game Menu</h2>
            <label htmlFor="number-player">Select number of players</label>
            <select
              name="players"
              id="number-players"
              onChange={handleUpdateCount}
            >
              <option value="">--Please chose the number of players--</option>
              <option value="2">2 players</option>
              <option value="3">3 players</option>
              <option value="4">4 players</option>
            </select>
            <div className="player-input">
              {inputArray.map((_, i) => (
                <PlayerInput
                  index={i}
                  key={i + 1}
                  setInputArray={setInputArray}
                  inputArray={inputArray}
                />
              ))}
            </div>
            <footer className="modal-footer">
              <button className="main-button" onClick={createGameHandler}>
                Start game
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerInput({ inputArray, setInputArray, index }) {
  function formHandler(e) {
    setInputArray(
      inputArray.map((el, i) =>
        i === +e.target.dataset.playernr
          ? { ...el, [e.target.id]: e.target.value }
          : el
      )
    );
  }
  return (
    <div>
      <form onChange={formHandler}>
        <label htmlFor="name">{`Player ${index + 1} name`}</label>{" "}
        <input type="text" id="name" data-playernr={index} />
        {"   "}
        <label htmlFor="color">{`Player ${index + 1} color`}</label>{" "}
        <input
          type="color"
          id="color"
          data-playernr={index}
          defaultValue={defaultColors[index]}
        />
      </form>
    </div>
  );
}
