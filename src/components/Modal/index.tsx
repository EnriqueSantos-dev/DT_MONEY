import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";

import { v4 as uuid } from "uuid";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Arrow } from "../../assets/Arrow";

import { CloseButtonSvg } from "../../assets/CloseButton";
import { Button } from "../Button";
import { Input } from "../Input";

import style from "./style.module.scss";
import { useValuesContext } from "../../contexts/Inputs/useInputs";

const schema = Yup.object({
  description: Yup.string().required().min(4),
  price: Yup.number().required(),
  category: Yup.string().required().min(3),
});

interface Props {
  isOpen: boolean;
  setCloseModal: (value: boolean) => void;
  overlay: boolean;
}

interface Inputs {
  description: string;
  price: string;
  category: string;
}

export function Modal({ isOpen, setCloseModal, overlay }: Props) {
  const { addItem } = useValuesContext();

  const modalRef = useRef<HTMLDivElement>(null);
  const [optionItem, setOptionItem] = useState<"input" | "output">();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  function clearClassListsButtons() {
    document
      .querySelector(".btn-option--active")
      ?.classList.remove("btn-option--active");
  }

  useEffect(() => {
    const root = document.getElementById("root");
    if (isOpen) {
      root?.classList.add("no-scrolling");
      setOptionItem(undefined);
      clearClassListsButtons();
      reset();
      return;
    }
    root?.classList.remove("no-scrolling");
  }, [isOpen]);

  function onSubmit(data: Inputs) {
    if (optionItem) {
      addItem({
        id: uuid(),
        title: data.description,
        category: data.category,
        value: Number(data.price),
        type: optionItem,
        date: new Date(),
      });
      setCloseModal(false);
    }
  }

  function closeModalClickedOutside(e: MouseEvent) {
    if (!modalRef.current) {
      return;
    }
    if (e.target === modalRef.current) {
      setCloseModal(false);
    }
  }

  function closeModalOnkeydownEscape(e: KeyboardEvent) {
    if (e.key === "Escape") {
      setCloseModal(false);
    }
  }

  window.addEventListener("click", closeModalClickedOutside);
  window.addEventListener("keydown", closeModalOnkeydownEscape);

  function handleClickOption() {
    const options = document.querySelectorAll(".btn-option");
    options.forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelector(".btn-option--active")
          ?.classList.remove("btn-option--active");
        item.classList.add("btn-option--active");
      });
    });
  }

  return createPortal(
    <div
      className={style.warper}
      style={{
        background: overlay ? "rgba(0 , 0, 0, 0.6)" : "none",
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? "1" : "0",
        transition: "all 200ms ease-in-out",
      }}
      ref={modalRef}
    >
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <p>Nova Transação</p>
          <button type="button" onClick={() => setCloseModal(false)}>
            <CloseButtonSvg />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <div className={style.inputsInfos}>
            <Input
              id="description"
              type="text"
              placeholder="Descrição"
              {...register("description")}
              error={errors.description?.message}
            />
            <Input
              id="price"
              type="number"
              placeholder="Preço"
              step="0.1"
              {...register("price")}
              error={errors.price?.message}
            />
            <Input
              id="category"
              type="text"
              placeholder="Categoria"
              {...register("category")}
              error={errors.category?.message}
            />
          </div>
          <div className={style.typeItem}>
            <Button
              className="btn-option"
              type="button"
              icon={<Arrow size={19.5} fill="#00B37E" />}
              height={58}
              onClick={() => {
                setOptionItem("input");
                handleClickOption();
              }}
            >
              Entrada
            </Button>
            <Button
              className="btn-option"
              type="button"
              icon={<Arrow size={19.5} fill="#F75A68" rotate />}
              height={58}
              onClick={() => {
                setOptionItem("output");
                handleClickOption();
              }}
            >
              Saida
            </Button>
          </div>
          <div className={style.submitForm}>
            <Button variant="green" type="submit">
              Cadastrar
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal") as HTMLDivElement
  );
}
