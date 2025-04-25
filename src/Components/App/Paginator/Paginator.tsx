import React from "react";
import { useEffect } from "react";
import styles from "./Paginator.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchPaintings } from "../../../API/api";
import { PAINTINGS_PER_PAGE } from "../../../API/constants";
import previousPage from "/previousPage.svg";
import nextPage from "/nextPage.svg";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  search: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  search,
  setCurrentPage,
  setTotalPages,
}) => {
  const { data } = useQuery({
    queryKey: ["pages", search],
    queryFn: () => fetchPaintings(search),
  });

  useEffect(() => {
    if (data?.length) {
      totalPages = Math.ceil(data.length / PAINTINGS_PER_PAGE);
      setTotalPages(totalPages);
      setCurrentPage(1);
    } else {
      setTotalPages(0);
    }
  }, [data, search]);
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];

  // Добавляем первую страницу
  if (currentPage > 2) pageNumbers.push(1);
  // Добавляем "..." если между первой и текущей страницей есть пропуск
  if (currentPage > 3 && totalPages > 4) pageNumbers.push("...");
  // Добавляем страницу если активна первая
  if (totalPages >= 4 && currentPage === totalPages) pageNumbers.push(currentPage - 2);
  // Добавляем соседние страницы (предыдущая, текущая, следующая)
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  // Добавляем страницу если активна последняя
  if (totalPages >= 4 && currentPage === 1) pageNumbers.push(currentPage + 2);
  // Добавляем "..." если между последней страницей и текущей есть пропуск
  if (currentPage < totalPages - 2 && totalPages > 4) pageNumbers.push("...");
  // Добавляем последнюю страницу
  if (currentPage < totalPages - 1) pageNumbers.push(totalPages);

  if (totalPages > 0) return (
    <ul className={styles.paginator}>
      <li className={styles.previousItem}>
        <a
          className={styles.previousLink}
          style={{pointerEvents: (currentPage === 1) ? 'none' : 'auto'}}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          <img src={previousPage}></img>
        </a>
      </li>

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <li key={index} className={styles.breakItem}>
              <a>...</a>
            </li>
          );
        }
        return (
          <li
            key={index}
            className={`${page === currentPage ? styles.active : ""} ${styles.pageItem}`}
          >
            <a className={styles.pageLink} onClick={() => handlePageClick(Number(page))}>{page}</a>
          </li>
        );
      })}

      <li className={styles.nextItem}>
        <a
          style={{pointerEvents: (currentPage === totalPages) ? 'none' : 'auto'}}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          <img src={nextPage}></img>
        </a>
      </li>
    </ul>
  );
};
