import styled from "styled-components";

const Select = styled.select`
  position: relative;
  display: block;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #2f3b52;
  color: ${({ theme }) => theme.colors.text};
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  font-family: "Monaco", sans-serif;
`;

export default Select;
