import "./GuideTip.scss";

interface GuideTipProps {
  icon: string;
  title: string;
  description: string;
}

function GuideTip({ icon, title, description }: GuideTipProps) {
  return (
    <div className="guide-tip">
      <i className={icon}></i>
      <div className="guide-tip-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default GuideTip;

