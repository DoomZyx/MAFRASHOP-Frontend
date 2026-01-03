import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

// Fonction pour détecter le type de device
const getDeviceType = (): DeviceType => {
  if (typeof window === "undefined") return "desktop";
  
  const width = window.innerWidth;
  
  if (width < 768) {
    return "mobile";
  } else if (width < 1025) {
    return "tablet";
  } else {
    return "desktop";
  }
};

function useResponsive(): DeviceType {
  // Initialiser avec la bonne valeur dès le départ
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType);

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}

export default useResponsive;
