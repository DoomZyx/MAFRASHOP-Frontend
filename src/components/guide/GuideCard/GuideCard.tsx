import "./GuideCard.scss";
import { Link } from "react-router-dom";

interface GuideCardProps {
  icon: string;
  title: string;
  description: string;
  items: string[];
  themeId?: string;
}

function GuideCard({ icon, title, description, items, themeId }: GuideCardProps) {
  const cardContent = (
    <>
      <div className="guide-card-icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );

  if (themeId) {
    return (
      <Link to={`/guide/${themeId}`} className="guide-card guide-card-link">
        {cardContent}
      </Link>
    );
  }

  return <div className="guide-card">{cardContent}</div>;
}

export default GuideCard;

