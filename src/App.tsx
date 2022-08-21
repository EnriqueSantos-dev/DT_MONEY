import { useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { Panel } from "./components/Panel";

import style from "./app.module.scss";
import { SearchTransaction } from "./components/SearchTransaction";
import { TableItems } from "./components/TableItems";
import { useValuesContext } from "./contexts/Inputs/useInputs";

function App() {
  const { items, filteredItems } = useValuesContext();

  const [isOpen, setIsOpenModal] = useState(false);

  return (
    <div className="App">
      <Header setOpenModal={setIsOpenModal} />
      <main className={style.main}>
        <Panel />
        <div className={style.containerContent}>
          <SearchTransaction lengthItems={items.length} />
          <TableItems
            items={filteredItems.length > 0 ? filteredItems : items}
          />
        </div>
      </main>
      <Modal isOpen={isOpen} setCloseModal={setIsOpenModal} overlay />
    </div>
  );
}

export default App;
