import { Link } from "react-router-dom";
import "./StatCard.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  link: string;
}

function StatCard({ title, value, icon, color, link }: StatCardProps) {
  return (
    <Link
      to={link}
      className="admin-stat-card"
      style={{ "--card-color": color } as React.CSSProperties}
    >
      <div className="stat-card-icon">
        <i className={icon}></i>
      </div>
      <div className="stat-card-content">
        <h3>{title}</h3>
        <p className="stat-card-value">{value}</p>
      </div>
    </Link>
  );
}

export default StatCard;

