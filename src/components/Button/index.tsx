import { ButtonHTMLAttributes, ReactNode } from "react";

import style from "./style.module.scss";
import "./style.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
  variant?: "green" | "dark";
  type: "button" | "submit" | "reset";
  px?: number;
  height?: number;
  className?: string;
}

const colorsButton = {
  green: "#00875F",
  dark: "#29292E",
};

export function Button({
  children,
  icon,
  px,
  type,
  variant = "green",
  height,
  className,
  ...rest
}: Props) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      {...rest}
      className={`${className} ${style.button} `}
      style={{
        backgroundColor: colorsButton[variant],
        gap: icon ? 8 : 0,
        paddingInline: px,
        color: variant === "green" ? "#fff" : "#C4C4CC",
        fontWeight: variant === "green" ? 600 : 400,
        height,
      }}
    >
      {icon}
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: "dark",
  icon: null,
  px: 20,
  height: 50,
  className: "",
};
