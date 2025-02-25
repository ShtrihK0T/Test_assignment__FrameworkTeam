import React from "react";
import styles from "./card.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchAddInfo } from "../../API/api";
import { Painting } from "../../API/painting";
import { BASE_URL } from "../../API/constants";

interface CardProps {
  painting: Painting;
}

export const Card: React.FC<CardProps> = ({ painting }) => {
  const { data } = useQuery({
    queryKey: ["addInfo"],
    queryFn: () => fetchAddInfo(painting.authorId, painting.locationId),
  });

  return (
    <div className={styles.card}>
      <img className={styles.img} src={BASE_URL + painting.imageUrl}></img>
      <div className={styles.infoOverlay}>
        <div className={styles.line}></div>
        <div className={styles.textField1}>
          <span className={styles.mainText}>{painting.name}</span>
          <span className={styles.secondaryText}>{painting.created}</span>
        </div>
        <div className={styles.textField2}>
          <span className={styles.mainText}>{data && data.authorName}</span>
          <span className={styles.secondaryText}>{data && data.location}</span>
        </div>
      </div>
    </div>
  );
};
