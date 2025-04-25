import React from "react";
import { useState } from "react";
import styles from "./App.module.scss";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Paginator } from "./Paginator/Paginator";
import { Search } from "./Search/Search";
import { ThemeProvider } from "./themeContext";

export const App: React.FC = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider>
      <Header />
      <div className={styles.grid}>
        <Search search={search} setSearch={setSearch} />
        <Content currentPage={currentPage} search={search} />
      </div>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        search={search}
        setCurrentPage={setCurrentPage}
        setTotalPages={setTotalPages}
      ></Paginator>
    </ThemeProvider>
  );
};
