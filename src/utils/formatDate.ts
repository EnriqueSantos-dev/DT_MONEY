import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function formatDate(date: Date, formatTemplate: string) {
  return format(date, formatTemplate, {
    locale: ptBR,
  });
}
