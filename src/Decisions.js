export function Decisions({
  gameState,
  setGameState,
  diceArray,
  setDiceArray,
  setOfDiceHandler,
  playerArray,
  setPlayerArray,
  setShowModal,
  children,
}) {
  function continueHandler() {
    const tempComp = Object.entries(gameState.commitDice)
      .filter(([value, count]) => count >= gameState.moves.at(value - 2))
      .map(([el0, _el1]) => +el0);

    setGameState({
      ...gameState,
      isRolling: true,
      activeButtons: false,
      tempCompleted: tempComp,
    });

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
    const completed = Object.entries(gameState.commitDice).filter(
      ([key, value]) => +value >= +gameState.moves.at(+key - 2)
    );

    const newPlayerArray = playerArray
      .map((el, i) =>
        i === gameState.active - 1
          ? {
              ...el,
              selected: { ...el.selected, ...gameState.commitDice },
              completed: [...el.completed, ...completed],
            }
          : el
      )
      .map((el, i) => {
        if (i === gameState.active - 1) return el;
        const newSelectedObject = Object.entries(el.selected).reduce(
          (acc, [key, value]) =>
            completed
              .map(([key, _val]) => [+key])
              .find(([compKey, _compVal]) => +compKey === +key)
              ? acc
              : { ...acc, [key]: value },
          {}
        );

        return { ...el, selected: newSelectedObject };
      });

    const winner = newPlayerArray[gameState.active - 1].completed.length > 2;

    setGameState({
      ...gameState,
      isRolling: false,
      activeButtons: winner ? false : true,
      winner: winner ? gameState.active - 1 : null,
      active: winner
        ? gameState.active
        : playerArray[gameState.active]
        ? gameState.active + 1
        : 1,
      commitDice: {},
      tempCompleted: [],
      completedRow: [
        ...gameState.completedRow,
        ...completed.map((el) => +el[0]),
      ],
      logArray: [
        ...gameState.logArray,
        [
          playerArray[gameState.active - 1],
          "decided to stop and save their progress",
        ],

        ...(completed.length > 0
          ? [
              [
                playerArray[gameState.active - 1],
                [
                  `won row ${[...completed.map(([key, _val]) => +key)].join(
                    " and "
                  )} !!`,
                ],
                "completed",
              ],
            ]
          : ""),
        ...(winner
          ? [
              [
                playerArray[gameState.active - 1],
                [`completed three columns and won the game !!`],
                "won",
              ],
            ]
          : ""),
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
          onClick={() => setShowModal(true)}
          disabled={gameState.hasBusted ? true : false}
        >
          New Game
        </button>
        <button
          className="main-button"
          onClick={continueHandler}
          disabled={
            !gameState.activeButtons || gameState.hasBusted ? true : false
          }
        >
          {Object.keys(gameState.commitDice).length < 1
            ? "Roll dice"
            : "Continue"}
        </button>
        <button
          className="main-button"
          onClick={stopHandler}
          disabled={
            !gameState.activeButtons ||
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
