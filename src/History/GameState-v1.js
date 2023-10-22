import { position } from "./Gameboard";

export function GameState(value, commitedArray, color = "black") {
  const returnValue = commitedArray.map(
    (el, i) =>
      Object.keys(el)[0] === `${value}` && (
        <span
          key={el + i}
          className="dot"
          style={{
            marginTop: `${
              position[+Object.keys(el)[0] - 2][+Object.values(el)[0] - 2]
            }%`,
            backgroundColor: `${color}`,
          }}
        ></span>
      )
  );
  return returnValue;
}
