import "./GuideIntro.scss";

interface GuideIntroProps {
  title: string;
  description: string;
}

function GuideIntro({ title, description }: GuideIntroProps) {
  return (
    <section className="guide-intro">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export default GuideIntro;

