import "./GuideArticle.scss";
import GuideRecommendedProducts from "../GuideRecommendedProducts/GuideRecommendedProducts";

import { RecommendedProduct } from "../../../data/guideThemesData";

interface GuideArticleProps {
  title: string;
  content: string;
  steps?: string[];
  tips?: string[];
  recommendedProducts?: RecommendedProduct[];
  images?: string[];
}

function GuideArticle({
  title,
  content,
  steps,
  tips,
  recommendedProducts,
  images,
}: GuideArticleProps) {
  return (
    <article className="guide-article">
      <h2>{title}</h2>
      <div className="guide-article-content">
        <p>{content}</p>
        {steps && steps.length > 0 && (
          <div className="guide-article-steps">
            <h3>Étapes</h3>
            <div className="guide-steps-list">
              {steps.map((step, index) => (
                <div key={index} className="guide-step-item">
                  {images && images[index] && (
                    <img
                      src={images[index]}
                      alt={`Étape ${index + 1} - ${title}`}
                      className="guide-step-image"
                      loading="lazy"
                    />
                  )}
                  <div className="guide-step-content">
                    <span className="guide-step-number">{index + 1}</span>
                    <p className="guide-step-text">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tips && tips.length > 0 && (
          <div className="guide-article-tips">
            <h3>Conseils</h3>
            <ul>
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
        {recommendedProducts && recommendedProducts.length > 0 && (
          <GuideRecommendedProducts recommendedProducts={recommendedProducts} />
        )}
      </div>
    </article>
  );
}

export default GuideArticle;

