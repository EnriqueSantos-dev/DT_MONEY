import { useRef } from "react";
import { Arrow } from "../../assets/Arrow";
import { Currency } from "../../assets/Currency";
import { useValuesContext } from "../../contexts/Inputs/useInputs";
import { Card } from "./components/Card";
import style from "./style.module.scss";

export function Panel() {
  const { inputs, outputs } = useValuesContext();
  const panelRef = useRef<HTMLDivElement>(null);

  function scrolling() {
    if (panelRef.current) {
      const scrollPanel = panelRef.current.scrollLeft;
      const screen = window.screen.width - 24;

      if (scrollPanel > screen) {
        panelRef.current.style.padding = "24px 24px 24px 0";
        panelRef.current.style.marginLeft = "-24px";
        return;
      }
      panelRef.current.style.padding = "24px";
      panelRef.current.style.removeProperty("margin-left");
    }
  }

  return (
    <div className={style.panel} ref={panelRef} onScroll={scrolling}>
      <div className={style.container}>
        <Card
          icon={<Arrow fill="#00B37E" size={26} />}
          value={inputs}
          type="Entradas"
        />
        <Card
          icon={<Arrow fill="#F75A68" size={26} rotate />}
          value={outputs}
          type="Saídas"
        />
        <Card
          icon={<Currency size={32} />}
          value={inputs - outputs}
          type="Total"
          variant="green"
        />
      </div>
    </div>
  );
}
