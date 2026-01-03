import { raceData } from "../../../data/raceData";
import useCarousel from "../../../hooks/useCarousel";
import "./raceCarousel.scss";

function RaceCarousel() {
  const { currentSlide, nextSlide, prevSlide, goToSlide } = useCarousel(
    raceData.length
  );

  const formatDate = (date: string) => {
    const parts = date.split(" ");
    return {
      day: parts[0],
      month: parts[1].toUpperCase(),
      year: parts[2],
    };
  };

  return (
    <div className="race-carousel">
      <button
        className="race-carousel-btn race-carousel-btn-prev"
        onClick={prevSlide}
        aria-label="Précédent"
      >
        <i className="bi bi-chevron-left"></i>
      </button>

      <div className="race-carousel-wrapper">
        <div className="race-carousel-track">
          {raceData.map((race, index) => {
            const startDate = formatDate(race.dateStart);
            const endDate = formatDate(race.dateEnd);

            return (
              <div
                key={race.id}
                className={`race-card ${
                  index === currentSlide ? "active" : ""
                }`}
                style={{
                  transform: `translateX(${(index - currentSlide) * 100}%)`,
                }}
              >
                <div className="race-card-image-wrapper">
                  <img
                    src={race.image}
                    alt={race.title}
                    className="race-background"
                  />
                  <div className="race-overlay"></div>
                  <div className="race-dates">
                    <div className="date-block">
                      <span className="date-day">{startDate.day}</span>
                      <span className="date-month">{startDate.month}</span>
                      <span className="date-year">{startDate.year}</span>
                    </div>
                    <span className="date-separator">—</span>
                    <div className="date-block">
                      <span className="date-day">{endDate.day}</span>
                      <span className="date-month">{endDate.month}</span>
                      <span className="date-year">{endDate.year}</span>
                    </div>
                  </div>
                </div>
                <div className="race-info">
                  <img
                    src={race.raceImage}
                    alt={`Tracé ${race.title}`}
                    className="race-track-image"
                  />
                  <h4 className="race-title">{race.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        className="race-carousel-btn race-carousel-btn-next"
        onClick={nextSlide}
        aria-label="Suivant"
      >
        <i className="bi bi-chevron-right"></i>
      </button>

      <div className="race-carousel-indicators">
        {raceData.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller à la course ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default RaceCarousel;
