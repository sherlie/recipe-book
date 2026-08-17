import { globalStyle } from '@vanilla-extract/css';

globalStyle('@import url("https://fonts.googleapis.com/css2?family=Ultra&display=swap")', {});

globalStyle('body', {
  backgroundColor: "#fff9ed",
});

globalStyle('h1, h2, h3', {
  fontFamily: 'Limelight',
  color: '#172c1f',
});

globalStyle('p, ul, li, h4, h5, h6', {
  color: '#172c1f',
  fontFamily: 'Arial',
});