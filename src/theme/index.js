import { createContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { THEME_KEY, THEME_DARK, THEME_LIGHT } from "../consts";
import lightTheme from "./light";
import darkTheme from "./dark";

const getTheme = (name) => (name === THEME_DARK ? darkTheme : lightTheme);
const localThemeName = localStorage.getItem(THEME_KEY);
const localTheme = getTheme(localThemeName);

export const themeToCheck = (theme) => (theme === THEME_DARK ? true : false);
export const checkToTheme = (checked) => (checked ? THEME_DARK : THEME_LIGHT);

export const ThemeContext = createContext({
  theme: localTheme,
  themeName: localThemeName,
  setThemeName: () => {},
});

export default function MyThemeProvider(props) {
  const [themeName, setThemeName] = useState(localThemeName);
  const [theme, setTheme] = useState(localTheme);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, themeName);
    setTheme(getTheme(themeName));
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setThemeName,
      }}
    >
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
