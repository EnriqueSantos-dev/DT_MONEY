import { useRef } from "react";
import { Arrow } from "../../assets/Arrow";
import { Currency } from "../../assets/Currency";
import { useValuesContext } from "../../contexts/Inputs/useInputs";
import { Card } from "./components/Card";
import style from "./style.module.scss";

export function Panel() {
  const {
    inputs,
    outputs,
    getTheLastInput,
    getTheLastOutput,
    getIntervalDateInputsOutputs,
  } = useValuesContext();

  const lastInput = getTheLastInput();
  const lastOutput = getTheLastOutput();
  const intervalDateInputsOutputs = getIntervalDateInputsOutputs();

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
          icon={<Arrow fill="#00B37E" size={32} />}
          value={inputs}
          type="Entradas"
          alternativeText={lastInput ? `última entrada em ${lastInput}` : ""}
        />
        <Card
          icon={<Arrow fill="#F75A68" size={32} rotate />}
          value={outputs}
          type="Saídas"
          alternativeText={lastOutput ? `última saída em ${lastOutput}` : ""}
        />
        <Card
          icon={<Currency size={32} />}
          value={inputs - outputs}
          type="Total"
          variant="green"
          alternativeText={
            intervalDateInputsOutputs ? `de ${intervalDateInputsOutputs}` : ""
          }
        />
      </div>
    </div>
  );
}
