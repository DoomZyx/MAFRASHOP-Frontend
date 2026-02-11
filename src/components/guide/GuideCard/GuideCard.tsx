import "./GuideCard.scss";

interface GuideCardProps {
  icon: string;
  title: string;
  description: string;
  items: string[];
}

function GuideCard({ icon, title, description, items }: GuideCardProps) {
  return (
    <div className="guide-card">
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
    </div>
  );
}

export default GuideCard;

