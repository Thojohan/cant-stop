export function ButtonLogic({ sorted, render, alreadyCommited }) {
  return (
    <>
      {render === "a" && (
        <button data-value={sorted}>Advance on {sorted.join(" and ")}</button>
      )}
      {render === "b" &&
        sorted.map((el) => <button data-value={el}>Advance on {el}</button>)}
      {render === "c" && (
        <button data-value={alreadyCommited}>
          Advance on {alreadyCommited.join(" and ")}
        </button>
      )}
      {render === "d" && <div>Can't progress on any track</div>}
    </>
  );
}
