import { useState } from "react";

function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return { isModalOpen, toggleModal };
}

export default useModal;
