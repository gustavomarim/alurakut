import { createGlobalStyle, ThemeProvider } from 'styled-components';
import {AlurakutStyles} from '../src/lib/AlurakutCommons';
import React from 'react';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS (Necolas Reset CSS <3) */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #e056fd;
    background-image: linear-gradient(315deg, #e056fd 0%, #000000 74%);
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}