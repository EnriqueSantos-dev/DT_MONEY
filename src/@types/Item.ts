export type Item = {
  id: string;
  title: string;
  value: number;
  date: Date;
  type: "input" | "output";
  category: string;
};
