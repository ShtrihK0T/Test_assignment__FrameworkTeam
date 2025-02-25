import React, { useState } from "react";
import styles from "./Search.module.scss";
import SearchIcon from "/searchIcon.svg";

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<SearchProps> = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setSearch(inputValue);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(inputValue);
    }
  };
  const handleButton = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div className={styles.search}>
      <img src={SearchIcon}></img>
      <input
        className={styles.input}
        placeholder="Search"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      ></input>
      {inputValue && (
        <button className={styles.resetBtn} onClick={handleButton}></button>
      )}
    </div>
  );
};
