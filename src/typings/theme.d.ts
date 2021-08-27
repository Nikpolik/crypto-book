import "styled-components";
import { Theme } from "../theme";

// Override DefaultTheme definition so that it contains our custom theme properties
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
