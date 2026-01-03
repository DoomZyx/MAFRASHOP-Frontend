import "bootstrap-icons/font/bootstrap-icons.css";

interface MenuButtonProps {
  onClick: () => void;
}

function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <button className="menu-button" onClick={onClick}>
      <span className="menu-button-icon">
        <i className="bi bi-justify"></i>
      </span>
    </button>
  );
}

export default MenuButton;
