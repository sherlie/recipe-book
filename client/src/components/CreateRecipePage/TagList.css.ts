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

export const tagButton = style({
  backgroundColor: vars.color.night,
  color: vars.color.sea,
  height: 16,
  width: 16,
  borderRadius: 8,
  margin: "0px 4px",
  padding: "1px 0px",
})

export const suggestedTagContainer = style({
  padding: 5,
  borderRadius: 4,
  backgroundColor: vars.color.sea,
  opacity: 0.6,
});