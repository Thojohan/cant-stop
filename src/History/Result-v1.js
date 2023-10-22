export function Result({
  el,
  completedRow,
  setPlayerArray,
  gameState,
  playerArray,
  setGameState,
}) {
  const notCompletedArray = [el.First, el.Second].map((e) =>
    !completedRow.find((num) => num === e) ? e : null
  );

  const oldArray = Object.entries(
    playerArray[gameState.active - 1]?.selected
  ) || [
    ["7", 2],
    ["6", 2],
  ];

  const commitArray = [
    ["7", 2],
    ["3", 2],
  ];
  function inputResult(e) {
    console.log(e);
    const input = [...e.target.closest(".result").children]
      .map((el) => el.dataset.value)
      .filter((e) => !completedRow.find((num) => +num !== +e));

    console.log(input);

    const newElements = commitArray.map(([key, value]) => {
      let returnVal = value;
      input.forEach((element) => {
        if (+element === +key) returnVal++;
      });
      return [key, returnVal];
    });

    setGameState({
      ...gameState,
      logArray: [
        ...gameState.logArray,
        [playerArray[gameState.active - 1], input],
      ],
    });
  }

  return (
    <div className="result" onClick={inputResult}>
      {notCompletedArray[0] &&
        (commitArray.find((e) => +e[0] === +notCompletedArray[0]) ||
          commitArray.length < 3) && (
          <div className="result-line" data-value={notCompletedArray[0]}>
            <p>{`Advance on ${notCompletedArray[0]}`}</p>
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

      {notCompletedArray[1] &&
        (commitArray.find(
          (num) =>
            (+num[0] !== +notCompletedArray[1] && commitArray.length < 2) ||
            +num[0] === +notCompletedArray[1]
        ) ||
          commitArray.length < 2) &&
        notCompletedArray.length > 1 && (
          <div className="result-line" data-value={notCompletedArray[1]}>
            <p>{`Advance on ${notCompletedArray[1]}`}</p>
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
