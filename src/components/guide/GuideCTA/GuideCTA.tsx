import "./GuideCTA.scss";
import { Link } from "react-router-dom";

interface CTAButton {
  text: string;
  href: string;
  variant: "primary" | "secondary";
}

interface GuideCTAProps {
  title: string;
  description: string;
  buttons: CTAButton[];
}

function GuideCTA({ title, description, buttons }: GuideCTAProps) {
  return (
    <section className="guide-cta">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="guide-cta-buttons">
        {buttons.map((button, index) => (
          <Link
            key={index}
            to={button.href}
            className={`guide-cta-button ${button.variant}`}
          >
            {button.text}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default GuideCTA;

