import styled from 'styled-components';
import { Color } from '../../theme/colors';

interface LevelProps {
  maxLevel: number;
  currentLevel: number;
  color: Color;
  direction: "left" | "right";
}

const getLevelWidth = ({ maxLevel, currentLevel }: LevelProps): number => {
  return Math.round((currentLevel / maxLevel) * 100);
};

const Level = styled.div<LevelProps>`
  position: absolute;
  width: ${getLevelWidth}%;
  height: 100%;
  background-color: ${({ theme, color }) => theme.colors[color]};
  ${({ direction }) => `${direction}: -8px`};
  z-index: -1;
`;

export default Level;