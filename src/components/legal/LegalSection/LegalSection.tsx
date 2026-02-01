import "./LegalSection.scss";

interface LegalSectionProps {
  children: React.ReactNode;
  className?: string;
}

const LegalSection = ({ children, className = "" }: LegalSectionProps) => {
  return <section className={`legal-section ${className}`}>{children}</section>;
};

export default LegalSection;
