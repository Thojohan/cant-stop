export function Result({
  el,
  sorted,
  render,
  gameState,
  setGameState,
  setDiceArray,
  playerArray,
  setOfDice,
}) {
  function progressHandler(e) {
    const newEl = e.target.dataset.value.split(",");

    const set = [...new Set(newEl), ...Object.entries(gameState.commitDice)]
      .map((el) => (typeof el === "object" ? el : [el, 0]))
      .map(([key, val]) => {
        const playerCommit = Object.entries(
          playerArray[gameState.active - 1].selected
        ).find(([prevkey, _val]) => +prevkey === +key);
        return [
          key,
          playerCommit && +playerCommit[1] > +val ? +playerCommit[1] : +val,
        ];
      });

    const modified = set
      .map((entry) =>
        newEl.filter((el) => +el === +entry[0]).length > 1
          ? [entry[0], +[entry[1] + 2]]
          : newEl.filter((el) => +el === +entry[0]).length === 1
          ? [entry[0], +[entry[1] + 1]]
          : entry
      )
      .reduce((acc, val) => ({ ...acc, [val[0]]: val[1] }), {});

    setGameState({
      ...gameState,
      commitDice: modified,
      isRolling: false,
      activeButtons: true,
      logArray: [
        ...gameState.logArray,
        [
          playerArray[gameState.active - 1],
          `advanced on column ${[...newEl].join(" and column ")}`,
        ],
      ],
    });
    setDiceArray([]);
    setOfDice.current = [];
  }

  const alreadyCommited = sorted.filter(
    (el) => Object.keys(gameState.commitDice).find((e) => +e === +el) && +el
  );

  return (
    <div className="result-wrapper">
      <div className="result">
        <div className="result-segment" data-value={el.First}>
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
        </div>{" "}
        +
        <div className="result-segment" data-value={el.Second}>
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
      </div>
      <div className="button-container dice-selector">
        {render === "a" && (
          <button data-value={sorted} onClick={progressHandler}>
            Advance on {sorted.join(" and ")}
          </button>
        )}
        {render === "b" &&
          (sorted.length === 1 ? (
            <button data-value={sorted[0]} onClick={progressHandler}>
              Advance on {sorted[0]}
            </button>
          ) : (
            <>
              <button data-value={sorted[0]} onClick={progressHandler}>
                Advance on {sorted[0]}
              </button>
              <button data-value={sorted[1]} onClick={progressHandler}>
                Advance on {sorted[1]}
              </button>
            </>
          ))}
        {render === "c" && (
          <button data-value={alreadyCommited} onClick={progressHandler}>
            Advance on {alreadyCommited.join(" and ")}
          </button>
        )}
        {render === "d" && gameState.isRolling === true && (
          <div>Can't progress on any track</div>
        )}
      </div>
    </div>
  );
}
