/* eslint-disable no-return-assign */
import { createContext, ReactNode, useEffect, useState } from "react";

import { Item } from "../../@types/Item";
import { mockItems } from "../../mock/item";

type ContextData = {
  inputs: number;
  outputs: number;
  items: Item[];
  addItem: (item: Item) => void;
};

export const ManagementOthers = createContext({} as ContextData);

export function InputsOthersProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>(mockItems);
  const [inputs, setInputs] = useState(0);
  const [outputs, setOutputs] = useState(0);

  function calculateInputs() {
    const calculate = items
      .filter((item) => item.type === "input")
      .reduce((acc, i) => {
        const copyAcc = acc;
        return copyAcc + i.value;
      }, 0);

    setInputs(calculate);
  }

  function calculateOutputs() {
    const calculate = items
      .filter((item) => item.type === "output")
      .reduce((acc, i) => {
        const copyAcc = acc;
        return copyAcc + i.value;
      }, 0);
    setOutputs(calculate);
  }

  useEffect(() => {
    calculateInputs();
    calculateOutputs();
  }, [items]);

  function addItem(item: Item) {
    setItems((prev) => [...prev, item]);
  }

  return (
    <ManagementOthers.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        inputs,
        outputs,
        items,
        addItem,
      }}
    >
      {children}
    </ManagementOthers.Provider>
  );
}
