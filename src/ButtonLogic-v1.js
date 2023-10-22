import { useRef } from "react";

export function ButtonLogic({
  el,
  gameState,
  updateBustCount,
  completedRow,
  playerArray,
  setPlayerArray,
}) {
  const sorted = [+el.First, +el.Second].filter(
    (el) => !completedRow.find((e) => +e === el)
  );

  const alreadyCommited = sorted.filter((el) =>
    Object.keys(gameState.commitDice).find((e) => +e === el)
  );

  console.log(alreadyCommited);

  const notCommited = sorted.filter(
    (el) => !Object.keys(gameState.commitDice).find((e) => +e === el)
  );

  const bust = useRef("");

  function renderLogic(previousCommit, alreadyCommited, sorted) {
    if (sorted.length < 1) return "d";

    if (
      previousCommit.length > 2 &&
      !previousCommit.find((el) => sorted.find((e) => +el === +e))
    )
      return "d";
    if (previousCommit.length < 2) return "a";
    if (previousCommit.length > 2) return "c";
    if (alreadyCommited.length > 1) return "a";
    if (previousCommit.length > 1 && alreadyCommited.length < 2) return "b";
  }

  const render = renderLogic(
    Object.keys(gameState.commitDice),
    alreadyCommited,
    sorted
  );
  bust.current = render;
  if (render === "d") updateBustCount("increase");

  return (
    <div className="button-container">
      {render === "a" && (
        <button data-value={sorted}>Advance on {sorted.join(" and ")}</button>
      )}
      {render === "b" &&
        sorted.map((el) => <button data-value={el}>Advance on {el}</button>)}
      {render === "c" && (
        <button data-value={Object.keys(gameState.commitDice)}>
          Advance on {Object.keys(gameState.commitDice).join(" and ")}
        </button>
      )}
      {render === "d" && <div>Can't progress on any track</div>}
    </div>
  );
}
