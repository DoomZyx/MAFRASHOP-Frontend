import "./Guide.scss";
import Nav from "../../components/nav/nav";
import Footer from "../../components/footer/footer";
import SEO from "../../components/shared/SEO";
import GuideHero from "../../components/guide/GuideHero/GuideHero";
import GuideIntro from "../../components/guide/GuideIntro/GuideIntro";
import GuideCategories from "../../components/guide/GuideCategories/GuideCategories";
import GuideTips from "../../components/guide/GuideTips/GuideTips";
import GuideCTA from "../../components/guide/GuideCTA/GuideCTA";

function Guide() {
  const heroData = {
    title: "Guide et Conseils",
    subtitle: "Tous nos conseils pour entretenir votre véhicule comme un professionnel",
  };

  const introData = {
    title: "Bienvenue dans notre guide d'entretien automobile",
    description:
      "Que vous soyez passionné d'automobile ou simplement soucieux de maintenir votre véhicule en parfait état, nos guides et conseils vous accompagnent dans toutes les étapes de l'entretien de votre voiture.",
  };

  const categoriesData = [
    {
      icon: "bi bi-droplet-fill",
      title: "Lavage Automobile",
      description:
        "Apprenez les techniques de lavage professionnel pour préserver la peinture de votre véhicule.",
      items: [
        "Technique de lavage en deux seaux",
        "Prélavage et rinçage",
        "Séchage sans rayures",
        "Nettoyage des jantes et vitres",
      ],
      themeId: "lavage-automobile",
    },
    {
      icon: "bi bi-stars",
      title: "Polissage et Rénovation",
      description:
        "Découvrez comment polir et rénover la carrosserie de votre véhicule pour retrouver son éclat d'origine.",
      items: [
        "Préparation de la surface",
        "Techniques de polissage",
        "Élimination des rayures",
        "Finitions et lustrage",
      ],
      themeId: "polissage-renovation",
    },
    {
      icon: "bi bi-shield-check",
      title: "Protection de la Carrosserie",
      description:
        "Protégez durablement votre véhicule avec les meilleures techniques de protection.",
      items: [
        "Application de cire",
        "Protection céramique",
        "Traitements hydrophobes",
        "Entretien régulier",
      ],
      themeId: "protection-carrosserie",
    },
    {
      icon: "bi bi-car-front-fill",
      title: "Entretien de l'Habitacle",
      description:
        "Maintenez l'intérieur de votre véhicule propre et agréable avec nos conseils d'entretien.",
      items: [
        "Nettoyage des plastiques",
        "Entretien du cuir",
        "Nettoyage des tissus",
        "Désodorisation",
      ],
      themeId: "entretien-habitacle",
    },
    {
      icon: "bi bi-tools",
      title: "Choix des Produits",
      description:
        "Comprenez quels produits utiliser selon vos besoins et votre type de véhicule.",
      items: [
        "Produits adaptés à votre véhicule",
        "Différence entre produits pro et particuliers",
        "Composition et efficacité",
        "Accessoires recommandés",
      ],
      themeId: "choix-produits",
    },
    {
      icon: "bi bi-calendar-check",
      title: "Programme d'Entretien",
      description:
        "Établissez un calendrier d'entretien régulier pour préserver votre véhicule dans le temps.",
      items: [
        "Fréquence de lavage",
        "Entretien saisonnier",
        "Protection hivernale",
        "Maintenance préventive",
      ],
      themeId: "programme-entretien",
    },
  ];

  const tipsData = [
    {
      icon: "bi bi-lightbulb-fill",
      title: "Température idéale",
      description:
        "Lavez votre véhicule à l'ombre et lorsque la carrosserie est froide pour éviter les traces d'eau et les taches.",
    },
    {
      icon: "bi bi-lightbulb-fill",
      title: "Qualité de l'eau",
      description:
        "Utilisez de l'eau déminéralisée pour le rinçage final afin d'éviter les traces de calcaire.",
    },
    {
      icon: "bi bi-lightbulb-fill",
      title: "Microfibres",
      description:
        "Investissez dans des microfibres de qualité pour éviter les rayures lors du séchage et de l'application des produits.",
    },
    {
      icon: "bi bi-lightbulb-fill",
      title: "Protection régulière",
      description:
        "Appliquez une protection (cire ou sealant) tous les 3 à 6 mois pour maintenir l'éclat et protéger la peinture.",
    },
  ];

  const ctaData = {
    title: "Découvrez nos produits",
    description:
      "Mettez en pratique nos conseils avec les produits d'entretien automobile MA-FRA de qualité professionnelle.",
    buttons: [
      {
        text: "Voir le catalogue",
        href: "/shop",
        variant: "primary" as const,
      },
      {
        text: "En savoir plus",
        href: "/expertise",
        variant: "secondary" as const,
      },
    ],
  };

  return (
    <div className="guide-page">
      <SEO
        title="Guide et Conseils - Entretien Automobile MAFRA"
        description="Découvrez nos guides et conseils pour l'entretien de votre véhicule. Techniques de lavage, polissage, protection et astuces professionnelles pour un résultat parfait."
        keywords="guide entretien auto, conseils lavage voiture, polissage carrosserie, protection véhicule, astuces automobile, tutoriels MAFRA"
        url="/guide"
      />
      <Nav />
      <div className="guide-container">
        <GuideHero title={heroData.title} subtitle={heroData.subtitle} />
        <div className="guide-content">
          <GuideIntro title={introData.title} description={introData.description} />
          <GuideCategories title="Nos Guides par Thème" categories={categoriesData} />
          <GuideTips title="Conseils d'Expert" tips={tipsData} />
          <GuideCTA
            title={ctaData.title}
            description={ctaData.description}
            buttons={ctaData.buttons}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Guide;
