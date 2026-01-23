import { Link } from "react-router-dom";
import "./ActionCard.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface ActionCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

function ActionCard({ icon, title, description, link }: ActionCardProps) {
  return (
    <Link to={link} className="admin-action-card">
      <i className={icon}></i>
      <h3>{title}</h3>
      <p>{description}</p>
    </Link>
  );
}

export default ActionCard;

