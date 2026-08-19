import { globalStyle } from '@vanilla-extract/css';

globalStyle('@import url("https://fonts.googleapis.com/css2?family=Ultra&display=swap")', {});

globalStyle('body', {
  backgroundColor: "#FFF5D0",
});

globalStyle('h1, h2, h3', {
  fontFamily: 'Limelight',
  color: '#1B475D',
});

globalStyle('p, ul, li, h4, h5, h6', {
  color: '#1B475D',
  fontFamily: 'Arial',
});