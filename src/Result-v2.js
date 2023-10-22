export function Result({ setOfDice, el, sorted, render, alreadyCommited }) {
  //
  // function inputResult(e) {
  //   console.log(e);
  //   const input = [...e.target.closest(".result").children]
  //     .map((el) => el.dataset.value)
  //     .filter((e) => !completedRow.find((num) => +num !== +e));
  //
  //   console.log(input);
  //
  //   const newElements = commitArray.map(([key, value]) => {
  //     let returnVal = value;
  //     input.forEach((element) => {
  //       if (+element === +key) returnVal++;
  //     });
  //     return [key, returnVal];
  //   });
  //
  //   setGameState({
  //     ...gameState,
  //     logArray: [
  //       ...gameState.logArray,
  //       [playerArray[gameState.active - 1], input],
  //     ],
  //   });
  // }

  //  const oldElementsArray = notCompletedArray.filter((e) =>
  //    commitArray.find((el) => e !== el)
  //  );

  console.log(setOfDice);
  return (
    <>
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
      <div className="button-container">
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
      </div>
    </>
  );
}
// {
//   handledArray &&
//     handledArray.map((el, i) => (
//       <div className="button-container" key={i}>
//         <ButtonLogic key={i} />
//       </div>
//     ));
// }
