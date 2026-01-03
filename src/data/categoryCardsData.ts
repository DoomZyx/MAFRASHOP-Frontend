export interface categoryCard {
  id: number;
  image: string;
  title: string;
  description: string;
  // link: string; // À réactiver plus tard quand le catalogue sera créé
}

export const categoryCardsData: categoryCard[] = [
  {
    id: 1,
    image: "/carrouselHomepage/exterior.webp",
    title: "EXTERIEUR",
    description:
      "Préservez l'éclat et la protection de votre carrosserie, de vos jantes et de vos surfaces extérieures. Découvrez nos produits de nettoyage pour voitures, motos, camping-cars et bateaux, efficaces contre le smog, la boue et les polluants environnementaux",
  },
  {
    id: 2,
    image: "/carrouselHomepage/interior.webp",
    title: "INTERIEUR",
    description:
      "Solutions professionnelles pour l'entretien de l'habitacle. Nettoyants pour tissus, cuirs, plastiques et surfaces intérieures de votre véhicule. Produits efficaces contre les taches et les odeurs.",
  },
  {
    id: 3,
    image: "/carrouselHomepage/tire.webp",
    title: "JANTES & PNEUS",
    description:
      "Nettoyants et protections spécialement conçus pour vos jantes et pneumatiques. Formules puissantes contre la poussière de frein, la saleté incrustée et les résidus routiers. Restaurez l'éclat d'origine de vos jantes.",
  },
  {
    id: 4,
    image: "/carrouselHomepage/carbody.webp",
    title: "PROTECTION CARROSSERIE",
    description:
      "Protégez durablement votre carrosserie avec nos cires et scellants professionnels. Créez une barrière protectrice contre les UV, les intempéries et les polluants. Brillance longue durée garantie.",
  },
  {
    id: 5,
    image: "/carrouselHomepage/entretien.webp",
    title: "RÉNOVATION & TACHES",
    description:
      "Éliminez les taches tenaces et rénovez vos surfaces avec nos produits spécialisés. Solutions professionnelles pour éliminer les rayures légères, oxydation et imperfections. Redonnez vie à votre véhicule.",
  },
  {
    id: 6,
    image: "/carrouselHomepage/cleaningproduct.webp",
    title: "ENTRETIEN RÉGULIER",
    description:
      "Tout le nécessaire pour l'entretien courant de votre véhicule au quotidien. Produits d'entretien rapide, spray détaillants et nettoyants multi-usages. Simplicité et efficacité pour un résultat impeccable.",
  },
  {
    id: 7,
    image: "/carrouselHomepage/kit.webp",
    title: "KITS COMPLETS",
    description:
      "Kits tout-en-un pour un entretien complet et professionnel de votre véhicule. Ensembles soigneusement sélectionnés avec tous les produits essentiels. Économisez tout en obtenant des résultats professionnels.",
  },
];
