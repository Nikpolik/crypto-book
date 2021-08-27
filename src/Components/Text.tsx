import styled from "styled-components";
import { Color } from "../theme/colors";
import { FontSize } from "../theme/fontSizes";

interface TextProps {
  fontSize?: FontSize;
  color?: Color;
}

const Text = styled.span<TextProps>`
  color: ${({ theme, color = "text" }) => theme.colors[color]};
  font-size: ${({ fontSize = "md", theme }) => theme.fontSizes[fontSize]}px;
  font-family: "Monaco", sans-serif;
`;

export default Text;
