import { style } from "@vanilla-extract/css";
import { vars } from "../../main.css";

export const tagList = style({
  listStyle: "none",
  paddingInlineStart: 0,
  display: "flex",
});

export const tagListItem = style({
  margin: 2,
})

export const tagContainer = style({
  padding: 5,
  borderRadius: 4,
  backgroundColor: vars.color.sea,
});