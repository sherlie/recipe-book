import { style } from "@vanilla-extract/css";
import { input, vars } from "../../main.css";

export const wrapper = style({
  backgroundColor: vars.color.sun,
  padding: 10,
  borderRadius: 5,
  marginBottom: 15,
});

export const componentHeader = style({
  display: "inline",
});

export const textArea = style([
  input,
  {
    width: "50rem",
    height: "10rem",
    maxWidth: "95%",
  },
]);

export const numberInput = style([
  input,
  {
    width: 50,
  },
]);
