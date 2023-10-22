import { GameState } from "./CreateDot";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const position = [
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

export function Gameboard({ gameState, playerArray }) {
  const [parent] = useAutoAnimate();
  const commitedArray = Object.keys(gameState.commitDice).map((el) => ({
    [+el]: +gameState.commitDice[+el],
  }));

  const playerCommited =
    playerArray?.map((el) => {
      const color = el.color;
      const selected = Object.entries(el.selected).map(([key, value]) => ({
        [key]: value,
      }));
      return [color, selected];
    }) || [];

  return (
    <section className="gameboard-container">
      <div className="inner-div">
        <div
          ref={parent}
          className="board-row"
          id="2"
          data-start={710}
          data-steps={3}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={2}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={2}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="3"
          data-start={810}
          data-steps={5}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={3}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={3}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="4"
          data-start={910}
          data-steps={7}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={4}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={4}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="5"
          data-start={1010}
          data-steps={9}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={5}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={5}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="6"
          data-start={1110}
          data-steps={11}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={6}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={6}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="7"
          data-start={1210}
          data-steps={13}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={7}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={7}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="8"
          data-start={1110}
          data-steps={11}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={8}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={8}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="9"
          data-start={1010}
          data-steps={9}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={9}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={9}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="10"
          data-start={910}
          data-steps={7}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={10}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={10}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="11"
          data-start={810}
          data-steps={5}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={11}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={11}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
        <div
          ref={parent}
          className="board-row"
          id="12"
          data-start={710}
          data-steps={3}
        >
          {playerCommited.map((el, i) => (
            <GameState
              key={i}
              position={position}
              value={12}
              color={el[0]}
              commitedArray={el[1]}
            />
          ))}
          {
            <GameState
              position={position}
              value={12}
              commitedArray={commitedArray}
              isTemp={true}
            />
          }
        </div>
      </div>
    </section>
  );
}
