import "./GuideHero.scss";

interface GuideHeroProps {
  title: string;
  subtitle: string;
}

function GuideHero({ title, subtitle }: GuideHeroProps) {
  return (
    <div className="guide-hero">
      <h1>{title}</h1>
      <div className="guide-hero-line"></div>
      <p className="guide-hero-subtitle">{subtitle}</p>
    </div>
  );
}

export default GuideHero;

