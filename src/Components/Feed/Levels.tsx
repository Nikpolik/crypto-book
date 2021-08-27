import { FC } from "react";
import { GroupedLevel } from "../../lib/levelsFeed";
import { Color } from "../../theme/colors";
import Item from "./Item";
import Level from "./Level";
import Row from "./Row";

interface LevelsProps {
  levels: GroupedLevel[];
  fields: Array<keyof GroupedLevel>;
  maxLevel: number;
  graphColor: Color;
  graphDirection: "left" | "right";
  priceColor: Color;
}

const Levels: FC<LevelsProps> = ({
  levels,
  fields,
  maxLevel,
  graphColor,
  graphDirection,
  priceColor,
}) => {
  return (
    <>
      {levels.map((level) => (
        <Row key={level.price}>
          {fields.map((field) => (
            <Item field={field} priceColor={priceColor} key={field}>
              {level[field]}
            </Item>
          ))}
          <Level
            maxLevel={maxLevel}
            currentLevel={level.cumulativeTotal}
            color={graphColor}
            direction={graphDirection}
          />
        </Row>
      ))}
    </>
  );
};

export default Levels;
