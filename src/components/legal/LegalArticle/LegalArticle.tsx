import "./LegalArticle.scss";

interface LegalArticleProps {
  title: string;
  children: React.ReactNode;
}

const LegalArticle = ({ title, children }: LegalArticleProps) => {
  return (
    <article className="legal-article">
      <h2>{title}</h2>
      {children}
    </article>
  );
};

export default LegalArticle;
