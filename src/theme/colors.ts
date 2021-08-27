const colors = {
  black: "#000",
  white: "#FFF",
  lightBlue: "#BEE7E8",
  purple: "#4e38d0",
  text: "#ddd8f2",
  lightText: "#A0A0A0",
  red: "#fa2100",
  background: "#1A2228",
  green: "#00FF00",
  transparentGreen: "rgba(100, 240, 0, 0.3)",
  transparentRed: "rgba(208, 49, 45, 0.3)",
};

export type Color = keyof typeof colors;
export default colors;
