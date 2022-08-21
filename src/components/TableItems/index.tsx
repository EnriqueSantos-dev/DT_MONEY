import { Item } from "../../@types/Item";
import { ItemList } from "../ItemList";

import style from "./style.module.scss";

interface Props {
  items: Item[];
}

export function TableItems({ items }: Props) {
  return (
    <div className={style.container}>
      {items.map((item) => (
        <ItemList key={item.id} data={item} />
      ))}
    </div>
  );
}
