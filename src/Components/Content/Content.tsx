import React from "react";
import { fetchPage } from "../../API/api";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../Card/Card";
import { Painting } from "../../API/painting";
import styles from "./Content.module.scss";

interface contentProps {
  currentPage: number;
  search: string;
}

export const Content: React.FC<contentProps> = ({ currentPage, search }) => {
  const { data } = useQuery({
    queryKey: ["paintings", currentPage, search],
    queryFn: () => fetchPage(currentPage, search),
  });

  return (
    <>
      {data &&
        data.map((painting: Painting) => {
          return <Card key={painting.id} painting={painting}></Card>;
        })}
      {data && data.length === 0 && (
        <div className={styles.searchInfo}>
          No matches for <span className={styles.searchHeader}> {search}</span>
          <p className={styles.serachText}>
            Please try again with a different spelling or keywords.
          </p>
        </div>
      )}
    </>
  );
};
