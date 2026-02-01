import { useState, useEffect } from "react";
import { getCookieConsent, saveCookieConsent, clearNonEssentialCookies } from "../utils/cookies";

export const useCookiesPage = () => {
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent) {
      setPreferences({
        essential: true,
        analytics: consent.analytics,
        marketing: consent.marketing,
      });
    }
  }, []);

  const handleToggle = (type: "analytics" | "marketing") => {
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    saveCookieConsent({
      essential: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
    });

    if (!preferences.analytics || !preferences.marketing) {
      clearNonEssentialCookies();
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAcceptAll = () => {
    setPreferences({
      essential: true,
      analytics: true,
      marketing: true,
    });
    saveCookieConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleRejectAll = () => {
    setPreferences({
      essential: true,
      analytics: false,
      marketing: false,
    });
    saveCookieConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
    clearNonEssentialCookies();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return {
    preferences,
    saved,
    handleToggle,
    handleSave,
    handleAcceptAll,
    handleRejectAll,
  };
};
