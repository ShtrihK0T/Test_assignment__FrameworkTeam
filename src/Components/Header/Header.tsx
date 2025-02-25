import React from "react";
import Logo from "/logo.svg";
import lightThemeBtn from "/lightThemeBtn.svg";
import darkThemeBtn from "/darkThemeBtn.svg";
import styles from "./Header.module.scss";

interface HeaderProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const handleThemeBtn = () => {
    if (theme === "dark") {
      setTheme("light");
    } else setTheme("dark");
  };

  return (
    <header className={styles.header}>
      {theme === "dark" && <img className={styles.logo} src={Logo}></img>}
      {theme === "light" && <img className={styles.logo} src={Logo}></img>}
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
