import { Item } from "../../@types/Item";
import { Calendar } from "../../assets/Calendar";
import { Indicator } from "../../assets/Indicator";
import { formatDate } from "../../utils/formatDate";
import { formatNumber } from "../../utils/formatNumber";

import style from "./style.module.scss";

interface Props {
  data: Item;
}

export function ItemList({ data }: Props) {
  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <h2>{data.title}</h2>
        <span
          style={{
            color: data.type === "input" ? "#00B37E" : "#F75A68",
          }}
        >
          {data.type === "output" ? "-" : ""}
          {formatNumber(data.value)}
        </span>
      </div>
      <div className={style.rightSide}>
        <div className={style.flexContainer}>
          <Indicator />
          <h3>{data.category}</h3>
        </div>
        <div className={style.flexContainer}>
          <Calendar />
          <h3>{formatDate(data.date, "dd/MM/yyy")}</h3>
        </div>
      </div>
    </div>
  );
}
