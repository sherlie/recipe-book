import { style } from '@vanilla-extract/css';
import { vars } from '../../main.css';

export const radioInput = style({
  opacity: 0,
  position: 'fixed',
  width: 0,
});

export const numberInput = style({
  marginLeft: 5,
  width: 50,
});

export const radioLabel = style({
  display: 'inline-block',
  backgroundColor: vars.color.sun,
  padding: '5px 20px',
  height: 20,
  fontFamily: 'sans-serif, Arial',
  fontSize: '16px',
  borderRadius: 4,
  margin: 2,

  selectors: {
    '&:has(input[type="radio"]:checked)': {
      backgroundColor: vars.color.olive,
    },
  },
});