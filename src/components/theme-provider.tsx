import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

interface ThemeContextProps {
  theme: string;
  updateTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  const updateTheme = useCallback(
    (theme: string) => {
      setTheme(theme);
      document.body.classList.remove(theme === "light" ? "dark" : "light");
      document.body.classList.add(theme);
      window.localStorage.setItem("theme", theme);
    },
    [theme, setTheme]
  );

  useEffect(() => {
    updateTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
