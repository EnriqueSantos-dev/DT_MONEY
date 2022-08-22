import { createContext, ReactNode, useEffect, useState } from "react";

import { Item } from "../../@types/Item";
import { formatDate } from "../../utils/formatDate";

type ContextData = {
  inputs: number;
  outputs: number;
  items: Item[];
  filteredItems: Item[];
  addItem: (item: Item) => void;
  getTheLastInput: () => string;
  getTheLastOutput: () => string;
  getIntervalDateInputsOutputs: () => string;
  filterItemsByOrTitle: (value: string) => void;
};

export const ManagementOthers = createContext({} as ContextData);

export function InputsOthersProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const storageItems = localStorage.getItem("@items");
      if (storageItems) {
        const convertedItems: Item[] = JSON.parse(storageItems);
        const mappedItems = convertedItems.map((item) => {
          return { ...item, date: new Date(item.date) };
        });
        return mappedItems;
      }
    } catch {
      return [];
    }

    return [];
  });

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
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
    localStorage.setItem("@items", JSON.stringify(items));
  }, [items]);

  function addItem(item: Item) {
    setItems((prev) => [...prev, item]);
  }

  function getTheLastInput() {
    try {
      const [theLast] = items
        .filter((item) => item.type === "input")
        .sort((a, b) => (a.date < b.date ? 1 : -1));

      return formatDate(theLast.date, "dd 'de' MMMM");
    } catch {
      return "";
    }
  }

  function getTheLastOutput() {
    try {
      const [theLast] = items
        .filter((item) => item.type === "output")
        .sort((a, b) => (a.date < b.date ? 1 : -1));

      return formatDate(theLast.date, "dd 'de' MMMM");
    } catch {
      return "";
    }
  }

  function getIntervalDateInputsOutputs() {
    try {
      const sortedDates = items.sort((a, b) => (a.date < b.date ? -1 : 1));
      const firstDate = formatDate(
        sortedDates[sortedDates.length - 1].date,
        "dd/MM/yyyy"
      );
      const lastDate = formatDate(sortedDates[0].date, "dd/MM/yyyy");

      return `${lastDate} até ${firstDate}`;
    } catch {
      return "";
    }
  }

  function filterItemsByOrTitle(value: string) {
    const regexDate = /^\d/;
    let filterItems: Item[] = [];

    if (!value.length) {
      setFilteredItems([]);
      return;
    }

    if (regexDate.test(value.trim())) {
      filterItems = items.filter((item) => {
        const dateString = formatDate(item.date, "dd/MM/yyyy");

        if (dateString.slice(0, value.length) === value) {
          return item;
        }

        return null;
      });

      setFilteredItems(filterItems);
      return;
    }

    filterItems = items.filter((item) =>
      item.title.trim().toLowerCase().includes(value.trim().toLowerCase())
    );
    setFilteredItems(filterItems);
  }

  return (
    <ManagementOthers.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        inputs,
        outputs,
        items,
        filteredItems,
        addItem,
        getTheLastInput,
        getTheLastOutput,
        getIntervalDateInputsOutputs,
        filterItemsByOrTitle,
      }}
    >
      {children}
    </ManagementOthers.Provider>
  );
}
