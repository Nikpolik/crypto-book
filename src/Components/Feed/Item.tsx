import styled from "styled-components";
import Text from "../Text";
import { GroupedLevel } from "../../lib/levelsFeed";
import { Theme } from "../../theme";
import { Color } from "../../theme/colors";

interface ItemProps {
  field: keyof GroupedLevel;
  priceColor: Color;
  theme: Theme;
}

const getItemColor = ({ field, priceColor, theme }: ItemProps): string => {
  if (field === "price") {
    return theme.colors[priceColor];
  }
  return theme.colors.text;
};

const Item = styled(Text)<ItemProps>`
  display: block;
  width: 70px;
  color: ${getItemColor};
`;

export default Item;
