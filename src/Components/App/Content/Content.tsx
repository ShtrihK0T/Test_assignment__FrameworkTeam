import React from "react";
import { fetchPage } from "../../../API/api";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../Card/Card";
import { IPainting } from "../../../API/painting";
import styles from "./Content.module.scss";

interface contentProps {
  currentPage: number;
  search: string;
}

export const Content: React.FC<contentProps> = ({ currentPage, search }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["paintings", currentPage, search],
    queryFn: () => fetchPage(currentPage, search),
  });

  return (
    <>
      {data?.map((painting: IPainting) => {
        return <Card key={painting.id} painting={painting}></Card>;
      }) ||
        (isLoading && <span className={styles.loading}>{"Loading..."}</span>) ||
        (error && (
          <span className={styles.errorMesage}>{"A loading error has occurred"}</span>
        ))}
      {data?.length === 0 && (
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
