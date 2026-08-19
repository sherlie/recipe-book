import { style } from "@vanilla-extract/css";

export const nav = style({
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "#B4BD62",
});

export const navList = style({
  listStyle: "none",
  display: "flex",
  paddingInlineStart: 0,
  marginBlockStart: 0,
  marginBlockEnd: 0,
  margin: 0,
});

export const navLink = style({
  textDecoration: "none",
  color: "#1B475D",
  display: "flex",
  alignItems: "center",
  padding: "0.7rem",
});

export const activeNavLink = style([
  navLink,
  {
    backgroundColor: "#8EBD9D",
  },
]);