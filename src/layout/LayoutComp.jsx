import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import HeaderComp from "./header/HeaderComp";
import MainComp from "./main/MainComp";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./footer/Footer";
import useAutoLogin from "../hooks/useAutoLogin";
import {Typography} from "@mui/material"
import DataProvider from "../store/DataProvider";


const LayoutComp = ({ children }) => {
  const finishAutoLogin = useAutoLogin();
  const [isDarkMode, setDarkMode] = useState(false);

  const themes = tmc({
    "text.headerColor": "!gray",
    "text.headerActive": "*white",
    favActive: "*#FB0000",
  });

  const darkMode = createTheme(themes.dark);
  const lightMode = createTheme(themes.light);

  const handleThemeChange = (checked) => {
    setDarkMode(checked);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
      <CssBaseline />
      <DataProvider>
        <HeaderComp
          isDarkMode={isDarkMode}
          onDarkModeChange={handleThemeChange}
        />
        <MainComp>
          {finishAutoLogin ? (
            children
          ) : (
            <Typography variant="h1" sx={{mt:10}}>Loading...</Typography> 
          )}
        </MainComp>
        <Footer />
      </DataProvider>
    </ThemeProvider>
  );
};

export default LayoutComp;
