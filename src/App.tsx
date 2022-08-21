import { useState } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { Panel } from "./components/Panel";
import { InputsOthersProvider } from "./contexts/Inputs/inputs";

function App() {
  const [isOpen, setIsOpenModal] = useState(false);

  return (
    <div className="App">
      <InputsOthersProvider>
        <Header setOpenModal={setIsOpenModal} />
        <Panel />
        <Modal isOpen={isOpen} setCloseModal={setIsOpenModal} overlay />
      </InputsOthersProvider>
    </div>
  );
}

export default App;
