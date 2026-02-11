import "./GuideTips.scss";
import GuideTip from "../GuideTip/GuideTip";

interface Tip {
  icon: string;
  title: string;
  description: string;
}

interface GuideTipsProps {
  title: string;
  tips: Tip[];
}

function GuideTips({ title, tips }: GuideTipsProps) {
  return (
    <section className="guide-tips">
      <h2>{title}</h2>
      <div className="guide-tips-grid">
        {tips.map((tip, index) => (
          <GuideTip
            key={index}
            icon={tip.icon}
            title={tip.title}
            description={tip.description}
          />
        ))}
      </div>
    </section>
  );
}

export default GuideTips;

