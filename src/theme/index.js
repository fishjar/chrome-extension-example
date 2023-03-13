import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { THEME_KEY, THEME_DARK, THEME_LIGHT } from "../consts";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export default function MyThemeProvider(props) {
  const localMode =
    localStorage.getItem(THEME_KEY) === THEME_DARK ? THEME_DARK : THEME_LIGHT;
  const [mode, setMode] = useState(localMode);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) =>
          prevMode === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
        );
      },
    }),
    []
  );

  const theme = useMemo(() => {
    localStorage.setItem(THEME_KEY, mode);
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
