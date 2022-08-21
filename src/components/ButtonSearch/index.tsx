import { ReactNode } from "react";
import style from "./style.module.scss";

interface Props {
  icon: ReactNode;
  children: ReactNode;
  errorInputField: string | undefined;
}

export function ButtonSearch({ icon, children, errorInputField }: Props) {
  return (
    <button
      className={`${style.buttonSearch} ${errorInputField ? style.error : ""}`}
      type="submit"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
