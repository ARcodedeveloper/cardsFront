import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { node } from "prop-types";

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [isDark, setDark] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setDark((prev) => !prev);
  }, [setDark]);

  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
    typography: {
      body1: {
        color: isDark ? '#f1f1f1' : '#333',
      },
      h1: {
        color: isDark ? '#f1f1f1' : '#333',
      },
      h2: {
        color: isDark ? '#f1f1f1' : '#333',
      },
      h3: {
        color: isDark ? '#f1f1f1' : '#333',
      },
      h4: {
        color: isDark ? '#f1f1f1' : '#333',
      },
      h5: {
        color: isDark ? '#f1f1f1' : '#333',
      },
      h6: {
        color: isDark ? '#f1f1f1' : '#333',
      },
    },
  });


  const value = useMemo(
    () => ({ isDark, toggleDarkMode }),
    [isDark, toggleDarkMode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a NameProvider");
  return context;
};

ThemeProvider.propTypes = {
  children: node.isRequired,
};
