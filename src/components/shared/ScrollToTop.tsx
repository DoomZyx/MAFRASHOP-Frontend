import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./ScrollToTop.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top quand la route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Afficher le bouton après avoir scrollé
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      className="scroll-to-top-btn"
      onClick={scrollToTop}
      aria-label="Retour en haut"
      title="Retour en haut"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}

export default ScrollToTop;

