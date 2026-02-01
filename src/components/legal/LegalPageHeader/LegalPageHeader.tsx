import "./LegalPageHeader.scss";

interface LegalPageHeaderProps {
  title: string;
  lastUpdate: string;
}

const LegalPageHeader = ({ title, lastUpdate }: LegalPageHeaderProps) => {
  return (
    <div className="legal-hero">
      <h1>{title}</h1>
      <div className="legal-hero-line"></div>
      <p className="legal-date">Date de dernière mise à jour : {lastUpdate}</p>
    </div>
  );
};

export default LegalPageHeader;
