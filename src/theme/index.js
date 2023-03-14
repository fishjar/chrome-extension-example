/*global chrome*/

import { createContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { THEME_KEY, THEME_DARK, THEME_LIGHT } from "../consts";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function MyThemeProvider(props) {
  const [mode, setMode] = useState(THEME_LIGHT);
  useEffect(() => {
    chrome.storage.sync.get([THEME_KEY]).then((result) => {
      console.log("Theme currently is " + result[THEME_KEY]);
      setMode(result[THEME_KEY] === THEME_DARK ? THEME_DARK : THEME_LIGHT);
    });
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
          chrome.storage.sync.set({ [THEME_KEY]: newMode }).then(() => {
            console.log("Theme is set to " + newMode);
          });
          return newMode;
        });
      },
    }),
    []
  );

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
      },
      ...props.themeOptions,
    });
  }, [mode, props.themeOptions]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
