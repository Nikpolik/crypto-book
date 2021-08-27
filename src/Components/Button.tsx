import styled from "styled-components";
import { Color } from "../theme/colors";

interface ButtonProps {
  color?: Color;
}

const Button = styled.button<ButtonProps>`
  width: 128px;
  padding: 8px 16px;
  font-size: 14px;
  border: 0;
  border-radius: 4px;
  background-color: ${({ theme, color = "purple" }) => theme.colors[color]};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  font-family: "Monaco", sans-serif;
`;

export default Button;
