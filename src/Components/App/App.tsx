import React from "react";
import { useState } from "react";
import styles from "./App.module.scss";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";
import { Paginator } from "./Paginator/Paginator";
import { Search } from "./Search/Search";
import { ThemeProvider } from "./context";

export const App: React.FC = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider>
      <Header/>
      <Search setSearch={setSearch} />
      <div className={styles.grid}>
        <Content currentPage={currentPage} search={search} />
      </div>
      <Paginator
        currentPage={currentPage}
        pageCount={pageCount}
        search={search}
        setCurrentPage={setCurrentPage}
        setPageCount={setPageCount}
      ></Paginator>
    </ThemeProvider>
  );
};
