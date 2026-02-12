export interface RecommendedProduct {
  productName: string;
}

export interface GuideArticle {
  title: string;
  content: string;
  steps?: string[];
  tips?: string[];
  recommendedProducts?: RecommendedProduct[];
  images?: string[];
}

export interface GuideTheme {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string;
  intro: string;
  articles: GuideArticle[];
}

export const guideThemesData: GuideTheme[] = [
  {
    id: "lavage-automobile",
    title: "Lavage Automobile",
    subtitle: "Techniques professionnelles pour préserver votre véhicule",
    description:
      "Découvrez les techniques de lavage professionnel pour préserver la peinture de votre véhicule. Apprenez les méthodes de prélavage, lavage en deux seaux, séchage sans rayures et nettoyage des jantes.",
    keywords:
      "lavage voiture, technique lavage deux seaux, prélavage, séchage voiture, nettoyage jantes, lavage professionnel",
    intro:
      "Un lavage professionnel est essentiel pour préserver l'éclat et la protection de la peinture de votre véhicule. Découvrez les techniques utilisées par les professionnels pour obtenir un résultat parfait sans endommager la carrosserie.",
    articles: [
      {
        title: "Technique de lavage en deux seaux",
        content:
          "La méthode des deux seaux est la technique de référence pour un lavage sans rayures. Elle permet de séparer l'eau propre de l'eau sale, minimisant ainsi le risque de rayer la peinture avec des particules de saleté.",
        steps: [
          "Préparez deux seaux : un pour l'eau savonneuse propre, un autre pour rincer votre gant ou éponge",
          "Remplissez le premier seau avec de l'eau tiède et votre shampooing auto",
          "Remplissez le second seau avec de l'eau claire pour le rinçage",
          "Trempez votre gant microfibre dans le premier seau et lavez une section du véhicule",
          "Rincez immédiatement votre gant dans le second seau avant de le retremper dans l'eau savonneuse",
          "Répétez le processus section par section, en commençant par le toit",
        ],
        tips: [
          "Utilisez un gant microfibre de qualité, jamais d'éponge classique",
          "Changez l'eau des seaux régulièrement si elle devient trop sale",
          "Lavez toujours de haut en bas pour éviter que la saleté ne coule sur les parties déjà lavées",
          "Utilisez un shampooing pH neutre spécialement conçu pour l'automobile",
        ],
        recommendedProducts: [
          { productName: "CAR WASH SHAMPOO e CERA DUAL" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Prélavage et rinçage",
        content:
          "Le prélavage est une étape cruciale qui permet d'éliminer la majorité de la saleté avant le lavage principal. Cela réduit considérablement le risque de rayures lors du lavage manuel.",
        steps: [
          "Vaporisez un produit de prélavage sur toute la carrosserie",
          "Laissez agir 3 à 5 minutes pour que le produit dissolve la saleté",
          "Rincez abondamment à l'eau claire avec un jet d'eau",
          "Vérifiez que toute la saleté visible a été éliminée",
          "Si nécessaire, répétez l'opération sur les zones très sales",
        ],
        tips: [
          "Effectuez le prélavage à l'ombre et sur une carrosserie froide",
          "Utilisez un jet d'eau à pression modérée, jamais de karcher haute pression directement sur la peinture",
          "Un bon prélavage peut éliminer jusqu'à 80% de la saleté",
          "Ne laissez jamais sécher le produit de prélavage sur la carrosserie",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
          // Exemple: { productName: "Pre-wash" },
          { productName: "Prelavage shampoing MANIAC"}
        ],
      },
      {
        title: "Séchage sans rayures",
        content:
          "Le séchage est une étape délicate où de nombreuses rayures peuvent être causées. Utilisez les bonnes techniques et les bons outils pour un séchage parfait sans dommage.",
        steps: [
          "Commencez par secouer le véhicule pour éliminer le maximum d'eau",
          "Utilisez une serviette microfibre de grande taille et de qualité",
          "Posez la serviette sur la surface et tirez-la plutôt que de frotter",
          "Séchez de haut en bas, section par section",
          "Changez de serviette dès qu'elle devient trop humide",
          "Utilisez un séchoir à air comprimé pour les zones difficiles d'accès",
        ],
        tips: [
          "Investissez dans des serviettes microfibre de qualité premium",
          "Ne jamais frotter avec la serviette, seulement tamponner ou tirer",
          "Séchez rapidement après le rinçage pour éviter les traces d'eau",
          "Pour un séchage optimal, utilisez un produit de séchage rapide (quick detailer)",
        ],
        recommendedProducts: [
          { productName: "Lot 6 microfibre"}
        ],
      },
      {
        title: "Nettoyage des jantes et vitres",
        content:
          "Les jantes et les vitres nécessitent des produits et techniques spécifiques pour un nettoyage efficace et sans dommage.",
        steps: [
          "Commencez par nettoyer les jantes en premier, avant le lavage de la carrosserie",
          "Utilisez un nettoyant jantes spécifique et une brosse adaptée",
          "Rincez abondamment les jantes",
          "Pour les vitres, utilisez un nettoyant vitres auto et un chiffon microfibre",
          "Nettoyez les vitres en mouvements circulaires",
          "Séchez avec un chiffon sec pour éviter les traces",
        ],
        tips: [
          "Nettoyez les jantes en premier car elles sont souvent les plus sales",
          "Utilisez des brosses spécifiques pour éviter d'endommager les jantes",
          "Pour les vitres, évitez les produits ménagers qui peuvent laisser des traces",
          "Nettoyez les vitres par temps nuageux pour éviter que le produit ne sèche trop vite",
        ],
        recommendedProducts: [
          { productName: "NETTOYANT JANTE ET PNEU"}
        ],
      },
      {
        title: "Lavage sans eau (Waterless)",
        content:
          "Le lavage sans eau est une technique écologique et pratique pour entretenir votre véhicule entre deux lavages complets ou lorsque l'eau est limitée.",
        steps: [
          "Vérifiez que la carrosserie n'est pas trop sale (poussière légère uniquement)",
          "Vaporisez le produit de lavage sans eau sur une section du véhicule",
          "Laissez agir quelques secondes pour que le produit encapsule la saleté",
          "Essuyez avec une microfibre propre en mouvements circulaires",
          "Tournez régulièrement la microfibre pour utiliser une partie propre",
          "Répétez section par section jusqu'à couvrir tout le véhicule",
        ],
        tips: [
          "Ne jamais utiliser cette technique sur une voiture très sale ou boueuse",
          "Utilisez plusieurs microfibres et changez-les régulièrement",
          "Idéal pour l'entretien entre deux lavages complets",
          "Respectez les instructions du fabricant concernant la température",
        ],
        recommendedProducts: [
          { productName: "Waterless" },
        ],
      },
      {
        title: "Lavage hivernal et protection",
        content:
          "L'hiver est la saison la plus agressive pour votre véhicule. Un lavage régulier et adapté est essentiel pour protéger la carrosserie du sel, du sable et des produits de déneigement.",
        steps: [
          "Lavez votre véhicule dès que possible après un épisode de neige ou de pluie",
          "Utilisez de l'eau tiède (jamais chaude) pour éviter les chocs thermiques",
          "Portez une attention particulière au lavage du bas de caisse et des passages de roues",
          "Rincez abondamment pour éliminer tout résidu de sel",
          "Séchez soigneusement toutes les surfaces, y compris les zones cachées",
          "Appliquez une protection supplémentaire après le lavage",
        ],
        tips: [
          "Lavez plus fréquemment en hiver (toutes les 2 semaines minimum)",
          "Le sel de déneigement est très corrosif, ne le laissez pas sécher",
          "Nettoyez particulièrement les bas de caisse où le sel s'accumule",
          "Pensez à protéger les jantes qui sont très exposées en hiver",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
          // Exemple: { productName: "Cire" },
        ],
      },
      {
        title: "Restauration des phares et optiques",
        content:
          "La restauration complète des phares permet de retrouver leur transparence et leur éclat d'origine. Cette méthode en 4 étapes garantit un résultat professionnel et durable.",
        images: [
          "/guide/regeneration/step1.webp", // Image étape 1 : Nettoyage avec Glass Cleaner
          "/guide/regeneration/step2.webp", // Image étape 2 : Ponçage
          "/guide/regeneration/step3.webp", // Image étape 3 : Polissage avec 1Shine Extérieurs
          "/guide/regeneration/step4.webp", // Image étape 4 : Application du sealant
        ],
        steps: [
          "Nettoyez les phares avec 1Shine Vitres et Glass Cleaner pour éliminer toute saleté qui pourrait rayer le phare lors du ponçage. \n Protégez la zone environnante (capot et aile) avec du ruban adhésif pour éviter les rayures. \n ",
          "Poncez avec le papier abrasif le plus grossier (1500) en maintenant la surface humide avec du Glass Cleaner, en effectuant des mouvements longitudinaux (jamais circulaires), parallèles à la courbure du phare. Continuez le ponçage pour éliminer les défauts grossiers, séchez, vérifiez l'homogénéité de la surface, passez au grain intermédiaire (2500) avec ponçage humide et mouvements inverses pour enlever les traces précédentes, séchez à nouveau et utilisez le grain le plus fin (4000).",
          "Appliquez le produit de polissage des phares avec 1Shine Extérieurs en effectuant des mouvements circulaires, en appliquant une certaine pression, puis retirez l'excédent avec un chiffon. Répétez les opérations de polissage jusqu'à obtenir une surface transparente et uniforme.",
          "Sans un produit d'étanchéisation approprié, les phares redeviendront rapidement ternes et jaunes. Nettoyez le phare avec du Glass Cleaner, puis appliquez le sealant de manière uniforme avec un chiffon microfibre \"Heavy Work\" en effectuant des mouvements longitudinaux, laissez bien sécher et répétez l'opération si nécessaire.",
        ],
        tips: [
          "Protégez toujours la peinture autour des phares avec du ruban adhésif avant de commencer",
          "Maintenez la surface humide pendant tout le ponçage pour éviter les rayures",
          "Utilisez des mouvements longitudinaux, jamais circulaires, lors du ponçage",
          "Le sealant est essentiel pour protéger durablement le travail de restauration",
          "Vérifiez régulièrement l'homogénéité de la surface entre chaque étape de ponçage",
        ],
        recommendedProducts: [
          { productName: "KIT REGENERATION PHARE" },
          { productName: "GLASS CLEANER PLUS" },
        ],
      },
      {
        title: "Nettoyage des bas de caisse et passages de roues",
        content:
          "Les bas de caisse et passages de roues sont les zones les plus exposées à la saleté, au sel et aux projections. Un nettoyage approfondi est essentiel pour préserver la carrosserie.",
        steps: [
          "Utilisez un nettoyant dégraissant spécifique pour ces zones",
          "Appliquez le produit généreusement et laissez agir 5 à 10 minutes",
          "Frottez avec une brosse adaptée pour décoller la saleté incrustée",
          "Rincez abondamment avec un jet d'eau à pression modérée",
          "Vérifiez que toute la saleté a été éliminée",
          "Séchez soigneusement ces zones pour éviter la corrosion",
        ],
        tips: [
          "Ces zones nécessitent un nettoyage plus fréquent que le reste du véhicule",
          "En hiver, nettoyez-les après chaque sortie sur route salée",
          "Utilisez des brosses spécifiques pour ne pas endommager les protections",
          "Un traitement antirouille peut être appliqué après nettoyage",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
          // Exemple: { productName: "Dégraissant" },
        ],
      },
      {
        title: "Lavage écologique et économique",
        content:
          "Il est possible de laver votre véhicule de manière écologique tout en préservant l'environnement et en économisant l'eau. Découvrez les techniques et produits respectueux de l'environnement.",
        steps: [
          "Utilisez des produits biodégradables et sans phosphates",
          "Récupérez l'eau de pluie pour le lavage",
          "Utilisez la technique du lavage sans eau pour l'entretien régulier",
          "Lavez sur une surface perméable pour que l'eau s'infiltre",
          "Évitez de laver sur la route pour ne pas polluer les égouts",
          "Utilisez des microfibres réutilisables plutôt que des produits jetables",
        ],
        tips: [
          "Un lavage écologique peut être aussi efficace qu'un lavage traditionnel",
          "Les produits écologiques sont souvent plus doux pour la peinture",
          "Réduisez la fréquence de lavage en utilisant des protections durables",
          "Privilégiez les produits concentrés pour réduire les emballages",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
      {
        title: "Lavage de la carrosserie mate",
        content:
          "Les carrosseries mates nécessitent des techniques de lavage spécifiques. Un mauvais lavage peut endommager définitivement le revêtement mat.",
        steps: [
          "Utilisez uniquement des produits spécifiques pour carrosserie mate",
          "Lavez à la main avec un gant microfibre très doux",
          "Évitez tout produit contenant des cires ou des silicones",
          "Rincez abondamment à l'eau claire",
          "Séchez avec une microfibre ultra-douce sans frotter",
          "N'appliquez jamais de produits de finition brillants",
        ],
        tips: [
          "Les carrosseries mates sont très sensibles aux rayures",
          "Testez toujours les produits sur une zone discrète en premier",
          "Ne jamais utiliser de produits abrasifs ou de polissage",
          "Consultez le manuel du constructeur pour les recommandations spécifiques",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
      {
        title: "Entretien après lavage",
        content:
          "Un bon lavage ne s'arrête pas au rinçage. L'entretien après lavage est crucial pour maintenir l'éclat et protéger durablement votre véhicule.",
        steps: [
          "Vérifiez que le véhicule est complètement sec",
          "Inspectez la carrosserie pour détecter d'éventuels défauts",
          "Appliquez un produit de protection (cire, sealant) si nécessaire",
          "Nettoyez et conditionnez les éléments en caoutchouc et plastique",
          "Vérifiez et nettoyez les joints de portes et capots",
          "Rangez vos outils de lavage proprement pour le prochain usage",
        ],
        tips: [
          "Un entretien régulier après lavage prolonge l'éclat de la peinture",
          "Les produits de protection doivent être appliqués sur une surface propre et sèche",
          "N'oubliez pas d'entretenir les éléments en caoutchouc pour éviter le vieillissement",
          "Rangez vos microfibres propres pour éviter la contamination",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
      {
        title: "Lavage à la main vs lavage automatique",
        content:
          "Le choix entre lavage à la main et lavage automatique dépend de plusieurs facteurs. Comprenez les avantages et inconvénients de chaque méthode.",
        steps: [
          "Évaluez l'état de saleté de votre véhicule",
          "Considérez le temps disponible et votre budget",
          "Pour un lavage manuel : préparez tous les outils nécessaires",
          "Pour un lavage automatique : choisissez un tunnel sans brosses si possible",
          "Dans tous les cas, vérifiez que les produits utilisés sont adaptés",
          "Inspectez le résultat et complétez si nécessaire",
        ],
        tips: [
          "Le lavage à la main offre un meilleur contrôle et moins de risques de rayures",
          "Les tunnels sans brosses sont préférables aux brosses rotatives",
          "Un lavage manuel régulier est meilleur pour la préservation à long terme",
          "Combinez les deux méthodes selon vos besoins et contraintes",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
      {
        title: "Gestion de l'eau et équipements",
        content:
          "Un bon équipement et une bonne gestion de l'eau sont essentiels pour un lavage efficace et économique. Découvrez les outils indispensables et les bonnes pratiques.",
        steps: [
          "Investissez dans un jet d'eau à pression réglable",
          "Choisissez des seaux avec séparateur de saleté (grit guard)",
          "Sélectionnez des microfibres de qualité premium",
          "Organisez votre espace de lavage pour un accès facile aux outils",
          "Récupérez et réutilisez l'eau quand c'est possible",
          "Entretenez régulièrement vos équipements",
        ],
        tips: [
          "Un grit guard dans les seaux réduit considérablement les risques de rayures",
          "Investir dans de bons outils est un investissement pour votre véhicule",
          "Des microfibres de qualité durent plus longtemps et sont plus efficaces",
          "Un espace bien organisé rend le lavage plus agréable et efficace",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
      {
        title: "Nettoyage des zones sensibles",
        content:
          "Certaines zones du véhicule nécessitent une attention particulière et des techniques spécifiques pour éviter les dommages. Apprenez à identifier et traiter ces zones délicates.",
        steps: [
          "Identifiez les zones sensibles : joints, badges, chromes, optiques",
          "Utilisez des produits spécifiques pour chaque type de surface",
          "Évitez les produits abrasifs sur les chromes et badges",
          "Nettoyez les joints avec des brosses douces et des produits adaptés",
          "Rincez soigneusement pour éviter les résidus",
          "Séchez immédiatement les zones sensibles",
        ],
        tips: [
          "Les badges et emblèmes peuvent se décoller avec des produits trop agressifs",
          "Les chromes nécessitent des produits spécifiques pour éviter l'oxydation",
          "Les joints en caoutchouc doivent être nettoyés et conditionnés régulièrement",
          "Testez toujours les produits sur une zone discrète en premier",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
      {
        title: "Lavage des véhicules de collection",
        content:
          "Les véhicules de collection et anciens nécessitent des techniques de lavage encore plus délicates pour préserver leur valeur et leur authenticité.",
        steps: [
          "Consultez les recommandations spécifiques du constructeur",
          "Utilisez uniquement des produits doux et pH neutre",
          "Évitez tout produit moderne qui pourrait endommager les finitions anciennes",
          "Lavez à la main avec des outils ultra-doux",
          "Séchez immédiatement pour éviter les taches d'eau",
          "Appliquez des protections adaptées aux finitions anciennes",
        ],
        tips: [
          "Les peintures anciennes sont souvent plus fragiles que les modernes",
          "Consultez des spécialistes pour les véhicules très anciens",
          "Documentez les produits et techniques utilisés",
          "Un lavage inadapté peut déprécier considérablement un véhicule de collection",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
      {
        title: "Erreurs courantes à éviter",
        content:
          "De nombreuses erreurs peuvent endommager la carrosserie lors du lavage. Apprenez à les identifier et à les éviter pour préserver votre véhicule.",
        steps: [
          "Évitez de laver au soleil ou sur une carrosserie chaude",
          "Ne jamais utiliser de produits ménagers (lessive, savon de Marseille)",
          "Ne pas frotter avec des éponges abrasives ou des brosses dures",
          "Ne jamais laisser sécher le savon sur la carrosserie",
          "Évitez les jets d'eau à très haute pression",
          "Ne pas utiliser la même microfibre pour toutes les zones",
        ],
        tips: [
          "Les produits ménagers peuvent endommager définitivement la peinture",
          "Une carrosserie chaude peut créer des taches d'eau difficiles à enlever",
          "Les éponges classiques contiennent des particules abrasives",
          "Un lavage mal fait peut coûter très cher en correction",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
      {
        title: "Fréquence de lavage optimale",
        content:
          "Déterminer la bonne fréquence de lavage est important pour maintenir votre véhicule en bon état sans le sur-entretien. Découvrez les facteurs à considérer.",
        steps: [
          "Évaluez votre environnement : ville, campagne, bord de mer",
          "Considérez les conditions météorologiques",
          "Adaptez la fréquence selon l'utilisation du véhicule",
          "En ville : toutes les 2-3 semaines minimum",
          "Bord de mer : toutes les semaines en période estivale",
          "Hiver : toutes les 2 semaines pour éliminer le sel",
        ],
        tips: [
          "Un lavage trop fréquent peut user la peinture prématurément",
          "Un lavage insuffisant laisse s'accumuler les agressions",
          "Les véhicules garés en extérieur nécessitent plus d'entretien",
          "Un véhicule bien protégé nécessite moins de lavages fréquents",
        ],
        recommendedProducts: [
          // Ajouter les noms exacts des produits ici
        ],
      },
    ],
  },
];

