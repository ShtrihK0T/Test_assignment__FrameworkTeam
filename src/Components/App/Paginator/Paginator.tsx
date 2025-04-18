import React from "react";
import { useEffect } from "react";
import styles from "./Paginator.module.scss";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { fetchPaintings } from "../../../API/api";
import { PAINTINGS_PER_PAGE } from "../../../API/constants";
import previousPage from "/previousPage.svg";
import nextPage from "/nextPage.svg";

interface PaginatorProps {
  currentPage: number;
  pageCount: number;
  search: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
}

export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  pageCount,
  search,
  setCurrentPage,
  setPageCount,
}) => {
  const { data } = useQuery({
    queryKey: ["pages", search],
    queryFn: () => fetchPaintings(search),
  });

  console.log(data);

  useEffect(() => {
    if (data && data.length) {
      pageCount = Math.ceil(data.length / PAINTINGS_PER_PAGE);
      setPageCount(pageCount);
      setCurrentPage(1);
      console.log("pagecount", pageCount);
    } else {
      setPageCount(0);
    }
  }, [data, search]);
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected + 1);
  };

  console.log("currentPage", currentPage);
  return (
    <>
      {currentPage > 0 && (
        <ReactPaginate
          forcePage={currentPage - 1}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          containerClassName={styles.paginator}
          activeClassName={styles.active}
          pageLinkClassName={styles.pageLink}
          breakLinkClassName={styles.breakLink}
          nextLinkClassName={styles.nextLink}
          pageClassName={styles.pageItem}
          breakClassName={styles.breakItem}
          nextClassName={styles.nextItem}
          previousClassName={styles.previousItem}
          disabledClassName={styles.disabledItem}
          previousLabel={<img src={previousPage} className={styles.label} />}
          nextLabel={<img src={nextPage} className={styles.label} />}
          renderOnZeroPageCount={null}
        ></ReactPaginate>
      )}
    </>
  );
};
