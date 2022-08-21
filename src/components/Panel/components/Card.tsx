import { ReactNode } from "react";
import { formatNumber } from "../../../utils/formatNumber";
import style from "./style.module.scss";

interface Props {
  value: number;
  icon: ReactNode;
  type: string;
  variant?: "green" | "dark";
}

export function Card({ value, icon, type, variant }: Props) {
  return (
    <div
      className={style.card}
      style={{
        backgroundColor: variant === "green" ? "#015F43" : " #323238",
        color: variant === "green" ? "white" : "#c4c4cc",
      }}
    >
      <div className={style.topCard}>
        <span>{type}</span>
        {icon}
      </div>
      <div className={style.bottomCard}>{formatNumber(value)}</div>
    </div>
  );
}

Card.defaultProps = {
  variant: "dark",
};
