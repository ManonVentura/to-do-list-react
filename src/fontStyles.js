import { createGlobalStyle } from "styled-components";

const FontStyles = createGlobalStyle`
@font-face {
    font-family: "Regular";
    src: local("Syne"),
      url("./fonts/Syne-Regular.ttf") format("truetype");
  }
  @font-face {
    font-family: "Bold";
    src: local("Syne"),
      url("./fonts/Syne-Bold.ttf") format("truetype");
  }
  @font-face {
    font-family: "ExtraBold";
    src: local("Syne"),
      url("./fonts/Syne-ExtraBold.ttf") format("truetype");
  }
  @font-face {
    font-family: "Italic";
    src: local("Syne"),
      url("./fonts/Syne-Italic.ttf") format("truetype");
  }
  @font-face {
    font-family: "MonoRegular";
    src: local("Syne"),
      url("./fonts/SyneMono-Regular.ttf") format("truetype");
  }`;

export default FontStyles;
