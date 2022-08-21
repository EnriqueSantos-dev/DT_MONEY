import { forwardRef, InputHTMLAttributes } from "react";

import style from "./style.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  id: string;
  type: string;
  error: string | undefined;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, id, type, error, ...rest }, ref) => (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={style.input}
      ref={ref}
      {...rest}
      style={{
        borderColor: error && "#f75a68",
      }}
    />
  )
);
