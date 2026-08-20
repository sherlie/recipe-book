import { createGlobalTheme, globalStyle, style } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  color: {
    butter: '#FFF5D0',
    sun: '#F6DA8F',
    olive: '#B4BD62',
    sea: '#8EBD9D',
    night: '#1B475D',
  },
});

globalStyle('@import url("https://fonts.googleapis.com/css2?family=Ultra&display=swap")', {});

globalStyle('body', {
  backgroundColor: vars.color.butter,
});

globalStyle('h1, h2, h3', {
  fontFamily: 'Limelight',
  color: vars.color.night,
});

globalStyle('p, ul, li, h4, h5, h6', {
  color: vars.color.night,
  fontFamily: 'Arial',
});

export const pageWrapper = style({
  paddingBottom: 40,
});

globalStyle('button', {
  backgroundColor:  vars.color.olive,
  color: vars.color.night,
  border: "none",
  borderRadius: 2,
  margin: 2,
});