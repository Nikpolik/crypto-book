import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('http://fonts.cdnfonts.com/css/monaco');

  html, body {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    margin: 8px;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
  }

  #root {
    width: 100%;
    height: 100%;
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }
`;

export default GlobalStyle;
