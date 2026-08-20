import { style } from '@vanilla-extract/css';
import { vars } from '../../main.css';

export const wrapper = style({
  backgroundColor: vars.color.sun,
  padding: 10,
  borderRadius: 5,
  marginBottom: 15,
});

export const componentHeader = style({
  display: "inline",
});


export const numberInput = style({
  width: 50,
});

export const submitButton = style({
  backgroundColor: vars.color.night,
  color: vars.color.sea,
  padding: "10px 15px",
  borderRadius: 4,
  fontWeight: "bold",
});
