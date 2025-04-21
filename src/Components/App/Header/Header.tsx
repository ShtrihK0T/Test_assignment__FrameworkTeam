import React from "react";
import Logo from "/logo.svg";
import lightThemeBtn from "/lightThemeBtn.svg";
import darkThemeBtn from "/darkThemeBtn.svg";
import styles from "./Header.module.scss";
import { useThemeContext } from "../themeContext";

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  const handleThemeBtn = () => {
    toggleTheme();
  };

  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo}></img>
      <button className={styles.themebtn} onClick={handleThemeBtn}>
        {theme === "light" && (
          <img src={lightThemeBtn} className={styles.themeIcon}></img>
        )}
        {theme === "dark" && (
          <img src={darkThemeBtn} className={styles.themeIcon}></img>
        )}
      </button>
    </header>
  );
};
