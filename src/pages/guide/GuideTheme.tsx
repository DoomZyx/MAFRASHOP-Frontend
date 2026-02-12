import "./GuideTheme.scss";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import SEO from "../../components/shared/SEO";
import GuideHero from "../../components/guide/GuideHero/GuideHero";
import GuideArticle from "../../components/guide/GuideArticle/GuideArticle";
import { useParams, Link } from "react-router-dom";
import { guideThemesData } from "../../data/guideThemesData";

function GuideTheme() {
  const { themeId } = useParams<{ themeId: string }>();
  const theme = guideThemesData.find((t) => t.id === themeId);

  if (!theme) {
    return (
      <div className="guide-page">
        <Nav />
        <div className="guide-container">
          <div className="guide-content">
            <h1>Thème non trouvé</h1>
            <Link to="/guide">Retour au guide</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="guide-page">
      <SEO
        title={`${theme.title} - Guide MAFRA`}
        description={theme.description}
        keywords={theme.keywords}
        url={`/guide/${themeId}`}
      />
      <Nav />
      <div className="guide-container">
        <GuideHero title={theme.title} subtitle={theme.subtitle} />
        <div className="guide-content">
          <div className="guide-theme-intro">
            <p>{theme.intro}</p>
          </div>
          <div className="guide-articles">
            {theme.articles.map((article, index) => (
              <GuideArticle
                key={index}
                title={article.title}
                content={article.content}
                steps={article.steps}
                tips={article.tips}
                recommendedProducts={article.recommendedProducts}
                images={article.images}
              />
            ))}
          </div>
          <div className="guide-theme-cta">
            <Link to="/guide" className="guide-back-link">
              Retour au guide
            </Link>
            <Link to="/shop" className="guide-shop-link">
              Voir les produits
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default GuideTheme;

