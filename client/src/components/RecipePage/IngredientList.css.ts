import { style } from '@vanilla-extract/css';
import { vars } from '../../main.css';

export const wrapper = style({
  backgroundColor: vars.color.sun,
  padding: 20,
  borderRadius: 5,
});