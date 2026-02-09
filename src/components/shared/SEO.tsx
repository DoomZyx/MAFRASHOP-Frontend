import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEO = ({
  title = "Mafrashop - Votre spécialiste en pièces auto et équipements",
  description = "Découvrez notre large gamme de pièces détachées automobiles, équipements et accessoires pour professionnels et particuliers. Livraison rapide et expertise technique.",
  keywords = "pièces auto, pièces détachées, équipements auto, accessoires automobile, professionnel auto",
  image = "/images/logoMAFRA.webp",
  url,
  type = "website",
  noindex = false,
  nofollow = false,
}: SEOProps) => {
  const baseTitle = "Mafrashop";
  const fullTitle = title.includes(baseTitle) ? title : `${title} | ${baseTitle}`;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = typeof window !== "undefined" ? window.location.pathname : "";
  const finalUrl = url || currentUrl;
  const fullImageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const fullUrl = finalUrl.startsWith("http") ? finalUrl : `${siteUrl}${finalUrl}`;

  // Mise à jour de la balise robots uniquement si noindex ou nofollow est explicitement activé
  // Sinon, on laisse la balise par défaut dans index.html (index, follow)
  if (typeof window !== "undefined" && (noindex || nofollow)) {
    const robotsContent = [
      noindex ? "noindex" : "index",
      nofollow ? "nofollow" : "follow",
    ].join(", ");
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", robotsContent);
  }

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Description
    updateMetaTag("description", description);

    // Keywords
    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    // Open Graph
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:image", fullImageUrl, "property");
    updateMetaTag("og:url", fullUrl, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:site_name", baseTitle, "property");

    // Twitter Card
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", fullImageUrl);

    // Robots - Modifier uniquement si noindex ou nofollow est activé
    // Sinon, laisser la balise par défaut (index, follow) de index.html
    if (noindex || nofollow) {
      const robotsContent = [
        noindex ? "noindex" : "index",
        nofollow ? "nofollow" : "follow",
      ].join(", ");
      updateMetaTag("robots", robotsContent);
    }

    // Canonical URL
    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);
  }, [fullTitle, description, keywords, fullImageUrl, fullUrl, type, noindex, nofollow]);

  return null;
};

export default SEO;

