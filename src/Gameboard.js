import { CreateDot } from "./CreateDot";
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

  const mixArray =
    [
      ...playerArray?.map((el) => {
        const color = el.color;
        const selected = Object.entries(el.selected).map(([key, value]) => ({
          [key]: value,
        }));
        return [color, selected];
      }),
      [null, commitedArray],
    ] || [];

  return (
    <section className="gameboard-container">
      <div className="inner-div">
        {Array(11)
          .fill(null)
          .map((_el, ind) => (
            <div ref={parent} className="board-row" id={ind + 2} key={ind}>
              {mixArray.map((el, i) => (
                <CreateDot
                  key={i}
                  position={position}
                  value={ind + 2}
                  color={el[0] || undefined}
                  commitedArray={el[1]}
                  isTemp={!el[0] ? true : false}
                />
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
