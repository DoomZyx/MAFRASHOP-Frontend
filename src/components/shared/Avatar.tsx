import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Avatar.scss";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: "small" | "medium" | "large";
  className?: string;
  showPlaceholder?: boolean;
}

function Avatar({ src, alt, size = "medium", className = "", showPlaceholder = true }: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const shouldShowImage = src && src.trim() !== "" && !imageError;

  const handleImageError = () => {
    setImageError(true);
  };

  const sizeClasses = {
    small: "avatar-small",
    medium: "avatar-medium",
    large: "avatar-large",
  };

  if (shouldShowImage) {
    return (
      <img
        src={src}
        alt={alt}
        className={`avatar-image ${sizeClasses[size]} ${className}`}
        onError={handleImageError}
        loading="lazy"
      />
    );
  }

  if (!showPlaceholder) {
    return null;
  }

  return (
    <div className={`avatar-placeholder ${sizeClasses[size]} ${className}`}>
      <i className="bi bi-person-circle"></i>
    </div>
  );
}

export default Avatar;
