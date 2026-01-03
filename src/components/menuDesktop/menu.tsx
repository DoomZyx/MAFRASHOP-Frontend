import "./menu.scss";

interface MenuDesktopProps {
  isModalOpen: boolean;
  toggleModal: () => void;
}

function MenuDesktop({ isModalOpen, toggleModal }: MenuDesktopProps) {
  return (
    <div className="menuDesktop-modal-overlay">
      <div className="menuDesktop-modal-container">
        <div className="menuDesktop-modal-header">
          <img
            className="nav-logo"
            src="/public/logoMAFRA.webp"
            alt="Logo Mafrashop"
          />
          <button onClick={toggleModal}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuDesktop;
