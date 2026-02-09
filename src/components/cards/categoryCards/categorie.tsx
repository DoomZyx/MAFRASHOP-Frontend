import useCarousel from "../../../hooks/useCarousel";
import { categoryCardsData } from "../../../data/categoryCardsData";
import "./categorie.scss";

function CategoryCards() {
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useCarousel(
    categoryCardsData.length
  );

  return (
    <section className="category-cards-section">
      <div className="carousel-container">
        <button
          className="carousel-btn carousel-btn-prev"
          onClick={prevSlide}
          aria-label="Précédent"
        >
          <i className="bi bi-chevron-left"></i>
        </button>

        <div className="carousel-wrapper">
          <div className="carousel-track">
            {categoryCardsData.map((card, index) => (
              <div
                key={card.id}
                className={`category-card ${
                  index === currentSlide ? "active" : ""
                }`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                <div className="card-image-wrapper">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    width="298"
                    height="529"
                    loading="lazy"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-btn carousel-btn-next"
          onClick={nextSlide}
          aria-label="Suivant"
        >
          <i className="bi bi-chevron-right"></i>
        </button>

        <div className="carousel-indicators">
          {categoryCardsData.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller à la slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryCards;
