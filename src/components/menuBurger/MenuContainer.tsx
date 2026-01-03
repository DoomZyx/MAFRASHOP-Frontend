import { useState } from "react";
import MenuBurger from "./menu";
import Nav from "../nav/nav";

function MenuContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Nav isModalOpen={isModalOpen} toggleModal={toggleModal} />
      <MenuBurger isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </>
  );
}

export default MenuContainer;
