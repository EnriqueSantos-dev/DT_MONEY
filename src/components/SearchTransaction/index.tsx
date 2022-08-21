import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Search } from "../../assets/Search";
import { useValuesContext } from "../../contexts/Inputs/useInputs";
import { ButtonSearch } from "../ButtonSearch";
import { Input } from "../Input";
import { schema } from "./schemaInput";
import style from "./style.module.scss";

interface Props {
  lengthItems: number;
}
export function SearchTransaction({ lengthItems }: Props) {
  const { filterItemsByOrTitle } = useValuesContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<{ searchTransaction: string }>({
    defaultValues: {
      searchTransaction: "",
    },
    resolver: yupResolver(schema),
  });

  const searchTransaction = watch("searchTransaction");

  useEffect(() => {
    filterItemsByOrTitle(searchTransaction);
  }, [searchTransaction]);

  function onSubmit(data: { searchTransaction: string }) {
    filterItemsByOrTitle(data.searchTransaction);
  }

  return (
    <div className={style.container}>
      <div className={style.infosTransactions}>
        <p>Transações</p>
        <span>{lengthItems} Itens</span>
      </div>
      <form
        className={style.searchTransaction}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="search-transaction"
          placeholder="Busque por uma transação"
          type="text"
          {...register("searchTransaction")}
          error={errors.searchTransaction?.message}
        />
        <ButtonSearch
          icon={<Search />}
          errorInputField={errors.searchTransaction?.message}
        >
          Buscar
        </ButtonSearch>
      </form>
    </div>
  );
}
