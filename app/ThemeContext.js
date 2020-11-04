import React from 'react';

import { calcResolutionUtils } from "./tools/resolution";
import { makeStyles } from './styles';

export const ThemeContext = React.createContext({
  theme: {
    measure: () => { },
    styles: {},
    screenContainer: {}
  },
  setTheme: () => { },
  updateMeasure: () => { }
});

function generateTheme(isLandscape) {
  const resolutionUtils = calcResolutionUtils(isLandscape);
  const measure = size => resolutionUtils.measure * size;

  const styles = makeStyles(measure);

  return {
    measure,
    styles,
    screenContainer: {
      width: resolutionUtils.width,
      height: resolutionUtils.height,
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  };
}

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = React.useState(generateTheme(false));

  const updateTheme = (props) => {
    setTheme(old => ({ ...old, ...props }));
  }

  const updateMeasure = (isLandscape) => {
    setTheme(generateTheme(isLandscape));
  }

  const initState = {
    theme,
    setTheme,
    updateTheme,
    updateMeasure
  }

  return (
    <ThemeContext.Provider value={initState}>
      {props.children}
    </ThemeContext.Provider>
  )
}