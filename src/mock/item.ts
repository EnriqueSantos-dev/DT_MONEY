import { Item } from "../@types/Item";

export const mockItems: Item[] = [
  {
    id: "1",
    title: "Alimentação",
    type: "output",
    value: 1500,
    category: "Alimentação",
    date: new Date(2022, 10, 5),
  },
  {
    id: "2",
    title: "Plano de Saúde",
    type: "output",
    value: 500,
    category: "Alimentação",
    date: new Date(2022, 10, 9),
  },
  {
    id: "3",
    title: "Aluguel",
    type: "output",
    value: 1800,
    category: "Alimentação",
    date: new Date(2022, 9, 5),
  },
  {
    id: "4",
    title: "Salário do mês",
    type: "input",
    value: 7000,
    category: "Salário",
    date: new Date(2022, 4, 5),
  },
];
