import { GameState } from "./GameState";

export const position = [
  [710, 610, 510],
  [810, 710, 610, 510, 410],
  [910, 810, 710, 610, 510, 410, 310],
  [1010, 910, 810, 710, 610, 510, 410, 310, 210],
  [1110, 1010, 910, 810, 710, 610, 510, 410, 310, 210, 110],
  [1210, 1110, 1010, 910, 810, 710, 610, 510, 410, 310, 210, 110, 10],
  [1110, 1010, 910, 810, 710, 610, 510, 410, 310, 210, 110],
  [1010, 910, 810, 710, 610, 510, 410, 310, 210],
  [910, 810, 710, 610, 510, 410, 310],
  [810, 710, 610, 510, 410],
  [710, 610, 510],
];

export const moves = [3, 5, 7, 9, 11, 13, 11, 9, 7, 5, 3];

export function Gameboard({ gameState, playerArray }) {
  const commitedArray = Object.keys(gameState.commitDice).map((el) => ({
    [+el]: +gameState.commitDice[+el],
  }));

  console.log(commitedArray);

  const playerCommited =
    playerArray?.map((el) => {
      const color = el.color;
      const selected = Object.entries(el.selected).map(([key, value]) => ({
        [key]: value,
      }));
      return [color, selected];
    }) || [];

  console.log(playerCommited);

  return (
    <section className="gameboard-container">
      <div className="inner-div">
        <div className="board-row" id="2" data-start={710} data-steps={3}>
          {playerCommited.map((el) => GameState(2, el[1], el[0]))}
          {GameState(2, commitedArray)}
        </div>
        <div className="board-row" id="3" data-start={810} data-steps={5}>
          {playerCommited.map((el) => GameState(3, el[1], el[0]))}
          {GameState(3, commitedArray)}
        </div>
        <div className="board-row" id="4" data-start={910} data-steps={7}>
          {playerCommited.map((el) => GameState(4, el[1], el[0]))}
          {GameState(4, commitedArray)}
        </div>
        <div className="board-row" id="5" data-start={1010} data-steps={9}>
          {playerCommited.map((el) => GameState(5, el[1], el[0]))}
          {GameState(5, commitedArray)}
        </div>
        <div className="board-row" id="6" data-start={1110} data-steps={11}>
          {playerCommited.map((el) => GameState(6, el[1], el[0]))}
          {GameState(6, commitedArray)}
        </div>
        <div className="board-row" id="7" data-start={1210} data-steps={13}>
          {playerCommited.map((el) => GameState(7, el[1], el[0]))}
          <span
            className="dot"
            style={{ marginTop: "10%", backgroundColor: "red" }}
          ></span>
          {GameState(7, commitedArray)}
        </div>
        <div className="board-row" id="8" data-start={1110} data-steps={11}>
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={el[1]}
              commitedArray={el[0]}
            />
          ))}
          {GameState(8, commitedArray)}
        </div>
        <div className="board-row" id="9" data-start={1010} data-steps={9}>
          {playerCommited.map((el) => GameState(9, el[1], el[0]))}
          {GameState(9, commitedArray)}
        </div>
        <div className="board-row" id="10" data-start={910} data-steps={7}>
          {playerCommited.map((el) => GameState(10, el[1], el[0]))}
          {GameState(10, commitedArray)}
        </div>
        <div className="board-row" id="11" data-start={810} data-steps={5}>
          {playerCommited.map((el) => GameState(11, el[1], el[0]))}
          {GameState(11, commitedArray)}
        </div>
        <div className="board-row" id="12" data-start={710} data-steps={3}>
          {playerCommited.map((el) => GameState(12, el[1], el[0]))}
          {GameState(12, commitedArray)}
        </div>
      </div>
    </section>
  );
}
