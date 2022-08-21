import { Logo } from "../../assets/Logo";
import { Button } from "../Button";

import style from "./style.module.scss";

interface Props {
  setOpenModal: (value: boolean) => void;
}

export function Header({ setOpenModal }: Props) {
  return (
    <div className={style.Header}>
      <div className={style.container}>
        <Logo />
        <div>
          <Button
            type="button"
            variant="green"
            onClick={() => setOpenModal(true)}
          >
            Nova Transação
          </Button>
        </div>
      </div>
    </div>
  );
}
