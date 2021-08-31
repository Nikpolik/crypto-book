import styled from "styled-components";
import { Theme } from "../../theme";
import { Color } from "../../theme/colors";

interface LevelProps {
  maxLevel: number;
  currentLevel: number;
  color: Color;
  direction: "left" | "right";
  theme: Theme;
}

const getLevelWidth = ({ maxLevel, currentLevel }: LevelProps): number => {
  return Math.round((currentLevel / maxLevel) * 100);
};

const Level = styled.div.attrs((props: LevelProps) => ({
  style: {
    backgroundColor: props.theme.colors[props.color],
    left: props.direction === "left" ? "-8px" : undefined,
    right: props.direction === "right" ? "-8px" : undefined,
    width: `${getLevelWidth(props)}%`,
  },
}))<LevelProps>`
  position: absolute;
  height: 100%;
  z-index: -1;
`;

export default Level;
