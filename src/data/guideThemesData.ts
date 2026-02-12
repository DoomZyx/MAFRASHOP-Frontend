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
          { productName: "SUPERMAFRASOL"}
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
          { productName: "SHAMPOO POWER" },
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
  {
    id: "polissage-renovation",
    title: "Polissage et Rénovation",
    subtitle: "Techniques professionnelles pour restaurer l'éclat de votre véhicule",
    description:
      "Apprenez les techniques de polissage et de rénovation pour éliminer les rayures, restaurer la brillance et protéger la peinture de votre véhicule. Découvrez les méthodes utilisées par les professionnels.",
    keywords:
      "polissage voiture, rénovation carrosserie, élimination rayures, lustrage, polish, compound, polish machine, polissage manuel",
    intro:
      "Le polissage et la rénovation permettent de restaurer l'éclat d'origine de votre véhicule en éliminant les imperfections de surface. Que vous souhaitiez corriger des rayures légères ou effectuer une rénovation complète, ces techniques vous permettront d'obtenir un résultat professionnel.",
    articles: [
      {
        title: "Préparation de la surface avant polissage",
        content:
          "Une bonne préparation est essentielle pour un résultat optimal. La surface doit être parfaitement propre et sèche avant toute opération de polissage.",
        steps: [
          "Lavez soigneusement le véhicule avec un shampooing auto de qualité",
          "Séchez complètement la surface avec un chiffon microfibre propre",
          "Inspectez la surface pour identifier les rayures et imperfections",
          "Protégez les zones sensibles (joints, plastiques) avec du ruban adhésif",
          "Assurez-vous de travailler dans un environnement propre et à l'ombre",
          "Vérifiez que la température de la carrosserie n'est pas excessive",
        ],
        tips: [
          "Ne jamais polir une surface sale ou poussiéreuse",
          "Travailler à l'ombre évite l'évaporation trop rapide des produits",
          "Protéger les zones sensibles prévient les dommages accidentels",
          "Une inspection minutieuse permet de planifier le travail efficacement",
        ],
        recommendedProducts: [
          { productName: "CAR WASH SHAMPOO e CERA DUAL" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Polissage manuel : techniques de base",
        content:
          "Le polissage manuel est idéal pour les petites surfaces ou les corrections localisées. Il nécessite patience et technique pour obtenir de bons résultats.",
        steps: [
          "Appliquez une petite quantité de polish sur un applicateur microfibre",
          "Répartissez le produit en mouvements circulaires légers",
          "Augmentez progressivement la pression pour faire pénétrer le polish",
          "Continuez avec des mouvements circulaires réguliers sur une zone de 50x50cm",
          "Laissez le polish sécher légèrement selon les instructions du produit",
          "Retirez l'excédent avec un chiffon microfibre propre en mouvements circulaires",
          "Inspectez le résultat et répétez si nécessaire",
        ],
        tips: [
          "Travaillez toujours sur de petites surfaces à la fois",
          "Ne laissez jamais le polish sécher complètement avant le retrait",
          "Utilisez des mouvements réguliers et constants",
          "Changez régulièrement de chiffon pour éviter les marques",
          "Testez d'abord sur une zone discrète pour valider la technique",
        ],
        recommendedProducts: [
          { productName: "Lot 6 microfibre" },
          { productName: "POLISH EXPRESS" },
        ],
      },
      {
        title: "Polissage à la polisseuse : méthode professionnelle",
        content:
          "Le polissage à la machine permet d'obtenir des résultats plus rapides et plus uniformes. Il nécessite une technique précise pour éviter les dommages.",
        steps: [
          "Choisissez la bonne polisseuse : rotative pour correction, orbitale pour finition",
          "Sélectionnez le bon pad selon le type de correction nécessaire",
          "Appliquez le polish directement sur le pad ou en croix sur la surface",
          "Démarrez la machine à vitesse faible (800-1000 RPM) pour répartir le produit",
          "Augmentez progressivement la vitesse (1200-1800 RPM) pour la correction",
          "Maintenez la machine en mouvement constant, jamais à l'arrêt",
          "Travaillez par passes horizontales puis verticales pour une couverture uniforme",
          "Réduisez la vitesse pour la finition et l'élimination des marques",
          "Retirez l'excédent avec un chiffon microfibre propre",
        ],
        tips: [
          "Ne jamais laisser la machine tourner au même endroit",
          "Maintenir une pression constante et modérée",
          "Travailler sur des surfaces planes, éviter les bords et angles",
          "Refroidir régulièrement le pad pour éviter la surchauffe",
          "Nettoyer le pad régulièrement pour maintenir son efficacité",
          "Commencer toujours par la vitesse la plus faible",
        ],
        recommendedProducts: [
          { productName: "POLISH EXPRESS" },
          { productName: "Compound" },
          { productName: "Pads de polissage" },
        ],
      },
      {
        title: "Élimination des rayures légères et moyennes",
        content:
          "Les rayures légères à moyennes peuvent être corrigées avec les bonnes techniques et produits. L'objectif est de lisser la surface sans enlever trop de vernis.",
        steps: [
          "Identifiez la profondeur des rayures : légères (vernis), moyennes (peinture), profondes (métal)",
          "Pour les rayures légères : utilisez un polish fin (POLISH EXPRESS) avec un pad souple",
          "Pour les rayures moyennes : utilisez un compound avec un pad plus abrasif",
          "Appliquez le produit et travaillez la zone avec des passes croisées",
          "Inspectez régulièrement la progression de la correction",
          "Passez à un polish fin pour éliminer les marques laissées par le compound",
          "Terminez avec un polish de finition (Illumina 2.0) pour restaurer la brillance",
        ],
        tips: [
          "Ne jamais essayer de corriger des rayures profondes (jusqu'au métal)",
          "Toujours tester sur une zone discrète en premier",
          "Travailler progressivement, plusieurs passes légères valent mieux qu'une passe agressive",
          "Éclairer la surface avec une lampe permet de mieux voir les rayures",
          "Les rayures profondes nécessitent une intervention professionnelle",
        ],
        recommendedProducts: [
          { productName: "Compound" },
          { productName: "POLISH EXPRESS" },
          { productName: "Pads de polissage" },
        ],
      },
      {
        title: "Technique de correction en plusieurs étapes",
        content:
          "Pour une rénovation complète, une approche en plusieurs étapes permet d'obtenir les meilleurs résultats. Chaque étape prépare la suivante.",
        steps: [
          "Étape 1 - Correction : Utilisez un compound abrasif avec un pad de coupe pour éliminer les défauts majeurs",
          "Étape 2 - Polissage : Passez à un polish moyen avec un pad de polissage pour lisser la surface",
          "Étape 3 - Finition : Appliquez un polish fin avec un pad de finition pour restaurer la brillance",
          "Étape 4 - Nettoyage : Retirez tous les résidus avec un nettoyant pour polissage",
          "Étape 5 - Protection : Appliquez une cire ou un sealant pour protéger le travail effectué",
        ],
        tips: [
          "Ne jamais sauter d'étape, chaque phase est importante",
          "Nettoyer soigneusement entre chaque étape",
          "Inspecter le résultat après chaque étape avant de passer à la suivante",
          "Adapter les produits selon l'état de la peinture",
          "Prendre son temps, la précipitation peut endommager la peinture",
        ],
        recommendedProducts: [
          { productName: "POLISH EXPRESS" },
          { productName: "Compound" },
          { productName: "Polish clever" },
          { productName: "Nettoyant polissage" },
          { productName: "METALCREM" },
          { productName: "CARLUX" },          
        ],
      },
      {
        title: "Polissage des zones sensibles et délicates",
        content:
          "Certaines zones du véhicule nécessitent une attention particulière lors du polissage. Les bords, angles et zones fines sont plus fragiles.",
        steps: [
          "Identifiez les zones sensibles : bords de portes, angles, zones fines",
          "Utilisez une polisseuse orbitale plutôt qu'une rotative sur ces zones",
          "Réduisez la vitesse et la pression sur les zones délicates",
          "Préférez le polissage manuel pour les zones très étroites",
          "Protégez les zones adjacentes avec du ruban adhésif",
          "Travaillez avec des mouvements très légers et contrôlés",
          "Inspectez régulièrement pour éviter la surchauffe ou les dommages",
        ],
        tips: [
          "Les bords et angles ont moins de vernis, attention à ne pas percer",
          "Une polisseuse orbitale est plus sûre que une rotative",
          "En cas de doute, préférez le polissage manuel",
          "Ne jamais forcer sur une zone qui résiste",
          "Les zones fines nécessitent des pads plus petits",
        ],
        recommendedProducts: [
          { productName: "Polish Clever" },
          { productName: "Applicateur microfibre" },
          { productName: "Pads de polissage" },
        ],
      },
      {
        title: "Lustrage et finition après polissage",
        content:
          "Le lustrage final permet d'éliminer les dernières marques et de restaurer une brillance parfaite. C'est l'étape qui donne l'éclat final à votre travail.",
        steps: [
          "Assurez-vous que toute la correction est terminée",
          "Nettoyez soigneusement la surface avec un nettoyant pour polissage",
          "Appliquez un polish de finition (illumina 2.0) avec un pad très doux",
          "Travaillez à vitesse modérée avec des mouvements réguliers",
          "Retirez l'excédent avec un chiffon microfibre très doux",
          "Inspectez la surface sous différents angles de lumière",
          "Appliquez une protection (cire ou sealant) pour préserver le résultat",
        ],
        tips: [
          "Le lustrage doit être la dernière étape avant la protection",
          "Utiliser des pads et chiffons très propres pour éviter les marques",
          "Une bonne finition élimine toutes les traces de polissage",
          "Inspecter sous différents angles révèle les imperfections restantes",
          "La protection appliquée après lustrage préserve le résultat plus longtemps",
        ],
        recommendedProducts: [
          { productName: "Polish finition" },
          { productName: "POLISH EXPRESS" },
          { productName: "METALCREM" },
          { productName: "CARLUX" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Élimination des marques de polisseuse",
        content:
          "Parfois, le polissage peut laisser des marques circulaires ou des hologrammes. Ces défauts peuvent être corrigés avec les bonnes techniques.",
        steps: [
          "Identifiez les marques : hologrammes, marques circulaires, brûlures",
          "Pour les hologrammes : utilisez un polish fin avec un pad souple à vitesse modérée",
          "Pour les marques circulaires : réduisez la vitesse et la pression, utilisez des mouvements plus larges",
          "Pour les brûlures : arrêtez immédiatement et laissez refroidir, puis polissez très légèrement",
          "Travaillez avec des passes croisées pour éliminer les marques",
          "Terminez avec un polish de finition à vitesse réduite",
        ],
        tips: [
          "Les marques de polisseuse sont souvent causées par une vitesse trop élevée",
          "Une pression excessive peut créer des brûlures",
          "Travailler à vitesse modérée réduit les risques de marques",
          "Des pads propres et en bon état évitent les marques",
          "En cas de brûlure, ne pas continuer, laisser refroidir",
        ],
        recommendedProducts: [
          { productName: "Polish finition" },
          { productName: "POLISH EXPRESS" },
          { productName: "Pads de polissage" },
          { productName: "Nettoyant polissage" },
        ],
      },
      {
        title: "Restauration des phares et optiques",
        content:
          "La restauration complète des phares permet de retrouver leur transparence et leur éclat d'origine. Cette méthode en 4 étapes garantit un résultat professionnel et durable.",
        images: [
          "/guide/regeneration/step1.webp", // Image étape 1 : Nettoyage avec Glass Cleaner
          "/guide/regeneration/step2.webp", // Image étape 2 : Ponçage
          "/guide/regeneration/step3.webp", // Image étape 3 : Polissage avec POLISH EXPRESS
          "/guide/regeneration/step4.webp", // Image étape 4 : Application du sealant
        ],
        steps: [
          "Nettoyez les phares avec GLASS CLEANER PLUS pour éliminer toute saleté qui pourrait rayer le phare lors du ponçage. \n Protégez la zone environnante (capot et aile) avec du ruban adhésif pour éviter les rayures. \n ",
          "Poncez avec le papier abrasif le plus grossier (1500) en maintenant la surface humide avec du Glass Cleaner, en effectuant des mouvements longitudinaux (jamais circulaires), parallèles à la courbure du phare. Continuez le ponçage pour éliminer les défauts grossiers, séchez, vérifiez l'homogénéité de la surface, passez au grain intermédiaire (2500) avec ponçage humide et mouvements inverses pour enlever les traces précédentes, séchez à nouveau et utilisez le grain le plus fin (4000).",
          "Appliquez le produit de polissage des phares avec POLISH EXPRESS en effectuant des mouvements circulaires, en appliquant une certaine pression, puis retirez l'excédent avec un chiffon. Répétez les opérations de polissage jusqu'à obtenir une surface transparente et uniforme.",
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
        title: "Entretien après polissage",
        content:
          "Un bon entretien après polissage permet de préserver les résultats obtenus. La protection et les soins réguliers sont essentiels.",
        steps: [
          "Attendez 24h après le polissage avant d'appliquer une protection",
          "Appliquez une cire ou un sealant de qualité",
          "Lavez régulièrement avec un shampooing pH neutre",
          "Séchez avec un chiffon microfibre propre",
          "Évitez les produits agressifs qui pourraient endommager la finition",
          "Réappliquez la protection tous les 3-4 mois",
        ],
        tips: [
          "Une bonne protection préserve le résultat du polissage",
          "Les lavages réguliers maintiennent la brillance",
          "Éviter les produits avec solvants qui peuvent attaquer la finition",
          "Un entretien régulier évite d'avoir à repolir trop souvent",
          "Inspecter régulièrement pour détecter les problèmes tôt",
        ],
        recommendedProducts: [
          { productName: "METALCREM" },
          { productName: "Car wash & shampoo e cera dual" },
          { productName: "Lot 6 microfibre" },
        ],
      },
    ],
  },
  {
    id: "protection-carrosserie",
    title: "Protection de la Carrosserie",
    subtitle: "Techniques professionnelles pour protéger durablement votre véhicule",
    description:
      "Découvrez les meilleures techniques de protection pour préserver l'éclat et la peinture de votre véhicule. Apprenez à appliquer cires, sealants et protections céramiques pour une protection optimale.",
    keywords:
      "protection carrosserie, cire voiture, sealant, protection céramique, traitement hydrophobe, METALCREM, CARLUX, protection peinture",
    intro:
      "La protection de la carrosserie est essentielle pour préserver l'éclat et la valeur de votre véhicule. Que vous choisissiez une cire traditionnelle, un sealant synthétique ou une protection céramique, chaque méthode offre des avantages spécifiques selon vos besoins.",
    articles: [
      {
        title: "Préparation de la surface avant protection",
        content:
          "Une surface parfaitement préparée est la clé d'une protection durable et efficace. Le nettoyage et la préparation déterminent la qualité de l'adhérence et la durée de vie de la protection.",
        steps: [
          "Lavez soigneusement le véhicule avec un shampooing auto de qualité",
          "Séchez complètement la surface avec un chiffon microfibre propre",
          "Décontaminez la surface avec un décontaminant ferreux si nécessaire",
          "Polissez la surface si des imperfections sont présentes",
          "Nettoyez avec un nettoyant pour polissage pour éliminer tous les résidus",
          "Assurez-vous que la surface est parfaitement sèche et propre",
          "Travaillez dans un environnement propre, à l'ombre et sans vent",
        ],
        tips: [
          "Une surface propre et préparée garantit une meilleure adhérence",
          "Ne jamais appliquer une protection sur une surface sale ou poussiéreuse",
          "Le polissage avant protection améliore l'éclat final",
          "Travailler à l'ombre évite l'application trop rapide du produit",
          "Une préparation minutieuse multiplie la durée de vie de la protection",
        ],
        recommendedProducts: [
          { productName: "CAR WASH SHAMPOO e CERA DUAL" },
          { productName: "Lot 6 microfibre" },
          { productName: "POLISH EXPRESS" },
        ],
      },
      {
        title: "Application de cire traditionnelle (METALCREM)",
        content:
          "La cire traditionnelle offre une brillance profonde et une protection naturelle. METALCREM est une cire de qualité professionnelle qui apporte éclat et protection durable à votre carrosserie.",
        steps: [
          "Assurez-vous que la surface est parfaitement propre et sèche",
          "Appliquez une petite quantité de METALCREM sur un applicateur microfibre",
          "Répartissez le produit en couche fine et uniforme sur une section de 50x50cm",
          "Laissez sécher selon les instructions (généralement 10-15 minutes)",
          "Vérifiez que la cire est sèche en touchant légèrement avec le doigt",
          "Retirez l'excédent avec un chiffon microfibre propre en mouvements circulaires",
          "Répétez le processus section par section sur tout le véhicule",
          "Terminez avec un chiffon microfibre très doux pour un fini parfait",
        ],
        tips: [
          "Ne jamais appliquer trop de produit, une couche fine suffit",
          "Travailler section par section évite que la cire ne sèche trop",
          "Un temps de séchage approprié facilite le retrait",
          "Utiliser des chiffons propres pour éviter les marques",
          "La cire traditionnelle offre une brillance profonde caractéristique",
          "Réappliquer tous les 2-3 mois selon les conditions",
        ],
        recommendedProducts: [
          { productName: "METALCREM" },
          { productName: "Applicateur microfibre" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Application de sealant synthétique (CARLUX)",
        content:
          "Les sealants synthétiques offrent une protection plus durable que les cires traditionnelles. CARLUX est un sealant professionnel qui offre une protection longue durée et une brillance exceptionnelle.",
        steps: [
          "Préparez la surface en la lavant et séchant soigneusement",
          "Appliquez CARLUX sur un applicateur microfibre ou directement sur la surface",
          "Répartissez en couche très fine et uniforme sur une section",
          "Laissez sécher complètement (généralement 20-30 minutes)",
          "Vérifiez le séchage : la surface doit être complètement sèche",
          "Retirez l'excédent avec un chiffon microfibre propre",
          "Polissez légèrement avec un chiffon doux pour un fini parfait",
          "Répétez sur toutes les sections du véhicule",
        ],
        tips: [
          "Les sealants nécessitent un temps de séchage plus long que les cires",
          "Une couche très fine est essentielle pour éviter les marques",
          "Ne pas laisser sécher trop longtemps, suivre les instructions",
          "Les sealants offrent une protection plus durable (6-12 mois)",
          "Ils créent une barrière protectrice contre les UV et les intempéries",
          "Idéal pour les véhicules exposés aux conditions difficiles",
        ],
        recommendedProducts: [
          { productName: "CARLUX" },
          { productName: "Applicateur microfibre" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Technique de protection en plusieurs couches",
        content:
          "L'application de plusieurs couches de protection améliore la durabilité et l'éclat. Cette technique est particulièrement efficace avec les sealants et les cires de qualité.",
        steps: [
          "Appliquez la première couche de protection (cire ou sealant)",
          "Laissez sécher complètement selon les instructions",
          "Retirez l'excédent avec un chiffon microfibre propre",
          "Attendez 24 heures avant d'appliquer la deuxième couche",
          "Appliquez la deuxième couche de la même manière que la première",
          "Laissez sécher et retirez l'excédent",
          "Pour une troisième couche, attendez à nouveau 24 heures",
          "Terminez avec un polish de finition si nécessaire",
        ],
        tips: [
          "Plusieurs couches fines valent mieux qu'une couche épaisse",
          "Respecter le temps d'attente entre les couches est essentiel",
          "Chaque couche supplémentaire améliore la protection",
          "Maximum 2-3 couches pour éviter l'accumulation",
          "Cette technique est idéale pour les véhicules de collection",
          "La protection multi-couches peut durer jusqu'à 12 mois",
        ],
        recommendedProducts: [
          { productName: "METALCREM" },
          { productName: "CARLUX" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Protection avec shampooing enrichi en cire",
        content:
          "Le shampooing enrichi en cire offre une protection légère à chaque lavage. CAR WASH SHAMPOO e CERA DUAL combine nettoyage et protection pour un entretien simplifié.",
        steps: [
          "Lavez le véhicule avec CAR WASH SHAMPOO e CERA DUAL selon les instructions",
          "Utilisez la méthode des deux seaux pour un lavage optimal",
          "Rincez abondamment à l'eau claire",
          "Séchez avec un chiffon microfibre propre",
          "La cire contenue dans le shampooing se dépose naturellement sur la surface",
          "Pour une protection renforcée, appliquez une cire complémentaire après séchage",
        ],
        tips: [
          "Ce type de shampooing maintient la protection entre les applications de cire",
          "Idéal pour l'entretien régulier et la maintenance",
          "Ne remplace pas une application de cire complète",
          "Utiliser régulièrement pour maintenir la protection",
          "Compatible avec les autres protections déjà appliquées",
        ],
        recommendedProducts: [
          { productName: "CAR WASH SHAMPOO e CERA DUAL" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Protection des zones spécifiques",
        content:
          "Certaines zones du véhicule nécessitent une attention particulière lors de l'application de la protection. Les zones exposées et les surfaces sensibles méritent un traitement adapté.",
        steps: [
          "Identifiez les zones prioritaires : capot, toit, ailes avant",
          "Appliquez une couche supplémentaire sur ces zones exposées",
          "Protégez les zones sensibles : joints, plastiques, phares",
          "Utilisez un applicateur plus petit pour les zones difficiles d'accès",
          "Appliquez la protection sur les jantes et les surfaces chromées si compatible",
          "Évitez les zones de contact (poignées, joints) pour éviter les résidus",
          "Nettoyez immédiatement tout excédent sur les zones non prévues",
        ],
        tips: [
          "Les zones exposées au soleil nécessitent plus de protection",
          "Protéger les jantes améliore leur résistance à la saleté",
          "Attention aux produits non compatibles avec certaines surfaces",
          "Les zones sensibles nécessitent une application plus précise",
          "Un traitement spécifique prolonge la durée de vie de ces zones",
        ],
        recommendedProducts: [
          { productName: "METALCREM" },
          { productName: "CARLUX" },
          { productName: "Applicateur microfibre" },
        ],
      },
      {
        title: "Entretien et maintenance de la protection",
        content:
          "Un entretien régulier permet de prolonger la durée de vie de la protection appliquée. Les soins appropriés maintiennent l'éclat et l'efficacité de la protection.",
        steps: [
          "Lavez régulièrement avec un shampooing pH neutre ou enrichi en cire",
          "Séchez toujours avec un chiffon microfibre propre",
          "Évitez les produits agressifs qui peuvent endommager la protection",
          "Inspectez régulièrement l'état de la protection",
          "Réappliquez la protection tous les 2-3 mois pour les cires",
          "Réappliquez tous les 6-12 mois pour les sealants",
          "Utilisez un décontaminant avant réapplication si nécessaire",
        ],
        tips: [
          "Un lavage régulier maintient la protection en bon état",
          "Les produits agressifs peuvent dégrader la protection prématurément",
          "Une inspection régulière permet de détecter les zones à retraiter",
          "La réapplication régulière maintient une protection optimale",
          "Un entretien approprié multiplie la durée de vie de la protection",
        ],
        recommendedProducts: [
          { productName: "CAR WASH SHAMPOO e CERA DUAL" },
          { productName: "Lot 6 microfibre" },
          { productName: "METALCREM" },
        ],
      },
      {
        title: "Protection hivernale et conditions difficiles",
        content:
          "Les conditions hivernales et difficiles nécessitent une protection renforcée. Le sel, le froid et les intempéries agressent particulièrement la carrosserie.",
        steps: [
          "Préparez le véhicule avec un lavage approfondi avant l'hiver",
          "Appliquez une protection renforcée (sealant ou plusieurs couches de cire)",
          "Privilégiez un sealant synthétique pour une meilleure résistance",
          "Appliquez une couche supplémentaire sur les zones exposées",
          "Lavez régulièrement en hiver pour éliminer le sel et la saleté",
          "Séchez soigneusement après chaque lavage hivernal",
          "Réappliquez la protection si nécessaire en milieu d'hiver",
        ],
        tips: [
          "Le sel de déneigement est très agressif pour la peinture",
          "Une protection renforcée avant l'hiver est essentielle",
          "Les lavages réguliers en hiver préservent la protection",
          "Un sealant résiste mieux aux conditions difficiles qu'une cire",
          "La protection hivernale réduit les dommages à long terme",
        ],
        recommendedProducts: [
          { productName: "CARLUX" },
          { productName: "METALCREM" },
          { productName: "CAR WASH SHAMPOO e CERA DUAL" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Élimination et renouvellement de la protection",
        content:
          "Parfois, il est nécessaire d'éliminer l'ancienne protection avant d'en appliquer une nouvelle. Cette étape garantit une adhérence optimale et un résultat parfait.",
        steps: [
          "Lavez soigneusement le véhicule",
          "Utilisez un décontaminant ferreux pour éliminer les résidus",
          "Appliquez un nettoyant pour polissage pour éliminer l'ancienne protection",
          "Polissez légèrement si nécessaire pour éliminer les résidus tenaces",
          "Nettoyez soigneusement avec un nettoyant pour polissage",
          "Séchez complètement la surface",
          "Appliquez la nouvelle protection sur la surface propre",
        ],
        tips: [
          "Éliminer l'ancienne protection garantit une meilleure adhérence",
          "Un nettoyant pour polissage élimine efficacement les résidus",
          "Ne jamais appliquer une nouvelle protection sur une ancienne dégradée",
          "Cette étape est nécessaire tous les 12-18 mois environ",
          "Une surface propre garantit les meilleurs résultats",
        ],
        recommendedProducts: [
          { productName: "Nettoyant polissage" },
          { productName: "POLISH EXPRESS" },
          { productName: "METALCREM" },
          { productName: "CARLUX" },
        ],
      },
      {
        title: "Protection et entretien des surfaces spéciales",
        content:
          "Certaines surfaces nécessitent des produits et techniques spécifiques. Les plastiques, chromes et surfaces mates ont des besoins particuliers en matière de protection.",
        steps: [
          "Identifiez le type de surface : plastique, chrome, peinture mate",
          "Pour les plastiques : utilisez des produits spécifiques non gras",
          "Pour les chromes : utilisez des produits anti-oxydation",
          "Pour les peintures mates : évitez les produits brillants",
          "Testez toujours sur une zone discrète en premier",
          "Appliquez selon les instructions spécifiques du produit",
          "Entretenez régulièrement selon les besoins de chaque surface",
        ],
        tips: [
          "Chaque type de surface nécessite des produits adaptés",
          "Les produits inadaptés peuvent endommager certaines surfaces",
          "Toujours tester avant d'appliquer sur toute la surface",
          "L'entretien spécifique prolonge la durée de vie",
          "Consulter les instructions des produits pour chaque surface",
        ],
        recommendedProducts: [
          { productName: "METALCREM" },
          { productName: "CARLUX" },
          { productName: "Applicateur microfibre" },
        ],
      },
    ],
  },
  {
    id: "entretien-habitacle",
    title: "Entretien de l'Habitacle",
    subtitle: "Techniques professionnelles pour un intérieur impeccable",
    description:
      "Apprenez les techniques d'entretien de l'habitacle pour maintenir un intérieur propre, agréable et en parfait état. Découvrez comment nettoyer plastiques, cuir, tissus et éliminer les odeurs.",
    keywords:
      "entretien habitacle, nettoyage intérieur voiture, nettoyage cuir, nettoyage tissus, nettoyage plastiques, désodorisation, DIAMANTPLAST",
    intro:
      "Un habitacle propre et bien entretenu améliore le confort et la valeur de votre véhicule. Chaque type de surface nécessite des techniques et produits spécifiques pour un résultat optimal et durable.",
    articles: [
      {
        title: "Préparation et organisation du nettoyage intérieur",
        content:
          "Une bonne préparation facilite le nettoyage et garantit un résultat optimal. Organiser son espace de travail et identifier les zones à traiter est essentiel.",
        steps: [
          "Retirez tous les objets personnels et accessoires de l'habitacle",
          "Aspirez soigneusement toutes les surfaces : sièges, tapis, coffre",
          "Identifiez les zones à traiter : plastiques, cuir, tissus",
          "Préparez vos produits et accessoires selon les surfaces",
          "Ventilez l'habitacle en ouvrant portes et fenêtres",
          "Travaillez section par section pour un résultat uniforme",
          "Commencez par le haut (tableau de bord) vers le bas (tapis)",
        ],
        tips: [
          "Un bon aspirateur est essentiel pour éliminer la poussière et les débris",
          "Travailler section par section évite d'oublier des zones",
          "Ventiler permet d'éviter l'inhalation de produits",
          "Retirer tous les objets facilite l'accès à toutes les surfaces",
          "Un nettoyage régulier évite l'accumulation de saleté",
        ],
        recommendedProducts: [
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Nettoyage des plastiques et tableaux de bord",
        content:
          "Les plastiques et tableaux de bord nécessitent des produits spécifiques pour éviter les reflets et préserver leur aspect mat. Un nettoyage approprié redonne leur éclat d'origine.",
        steps: [
          "Aspirez d'abord les plastiques pour éliminer la poussière",
          "Appliquez un nettoyant spécifique pour plastiques sur un chiffon microfibre",
          "Nettoyez en mouvements circulaires légers",
          "Évitez les produits gras qui créent des reflets",
          "Séchez avec un chiffon microfibre propre",
          "Appliquez un protecteur UV si nécessaire pour préserver les plastiques",
          "Nettoyez les écrans et surfaces tactiles avec un produit adapté",
        ],
        tips: [
          "Utiliser des produits spécifiques pour plastiques évite les reflets",
          "Éviter les produits contenant de l'alcool sur les écrans",
          "Un protecteur UV préserve les plastiques du vieillissement",
          "Nettoyer régulièrement évite l'accumulation de poussière",
          "Tester sur une zone discrète avant d'appliquer sur toute la surface",
        ],
        recommendedProducts: [
          { productName: "DIAMANTPLAST SHINE SPRAY" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Entretien du cuir : nettoyage et conditionnement",
        content:
          "Le cuir nécessite un entretien régulier pour préserver sa souplesse et son éclat. Le nettoyage et le conditionnement sont essentiels pour maintenir le cuir en parfait état.",
        steps: [
          "Aspirez d'abord le cuir pour éliminer la poussière et les débris",
          "Appliquez un nettoyant spécifique pour cuir sur un chiffon microfibre",
          "Nettoyez en mouvements circulaires doux",
          "Traitez les taches tenaces avec un nettoyant concentré",
          "Rincez légèrement avec un chiffon humide si nécessaire",
          "Laissez sécher complètement",
          "Appliquez un conditionneur pour cuir pour restaurer la souplesse",
          "Faites pénétrer le conditionneur avec des mouvements circulaires",
          "Retirez l'excédent avec un chiffon microfibre propre",
        ],
        tips: [
          "Le conditionnement régulier prévient le craquelage du cuir",
          "Éviter les produits agressifs qui peuvent endommager le cuir",
          "Traiter les taches rapidement évite qu'elles ne s'incrustent",
          "Un conditionnement tous les 3-4 mois maintient le cuir souple",
          "Protéger le cuir du soleil direct prévient le vieillissement",
        ],
        recommendedProducts: [
          { productName: "TRAITEMENT CUIR" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Nettoyage des tissus et moquettes",
        content:
          "Les tissus et moquettes nécessitent des techniques spécifiques pour éliminer les taches et les odeurs. Un nettoyage approfondi redonne fraîcheur à l'habitacle.",
        steps: [
          "Aspirez soigneusement les tissus et moquettes",
          "Identifiez les taches et traitez-les individuellement",
          "Appliquez un nettoyant pour tissus sur les taches",
          "Frottez délicatement avec une brosse douce",
          "Laissez agir quelques minutes selon les instructions",
          "Aspirez l'excédent de produit et d'humidité",
          "Pour un nettoyage approfondi, utilisez un extracteur si disponible",
          "Laissez sécher complètement avec les portes ouvertes",
          "Réaspirez une fois sec pour éliminer les résidus",
        ],
        tips: [
          "Traiter les taches rapidement améliore les résultats",
          "Tester le nettoyant sur une zone discrète avant application",
          "Ne pas saturer les tissus pour éviter les moisissures",
          "Un séchage complet est essentiel",
          "Un nettoyage régulier évite l'accumulation de saleté",
        ],
        recommendedProducts: [
          { productName: "TRAITEMENT 3/1 TISSUS" },
          { productName: "FLASH" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Nettoyage des vitres intérieures",
        content:
          "Des vitres intérieures propres améliorent la visibilité et l'aspect général de l'habitacle. Un nettoyage approprié élimine les traces et les buées.",
        steps: [
          "Retirez la poussière avec un chiffon microfibre sec",
          "Appliquez un nettoyant pour vitres sur un chiffon microfibre",
          "Nettoyez en mouvements circulaires ou verticaux",
          "Évitez les produits contenant de l'alcool sur les vitres teintées",
          "Séchez avec un chiffon microfibre propre et sec",
          "Vérifiez qu'il ne reste pas de traces",
          "Nettoyez les rétroviseurs et écrans de la même manière",
        ],
        tips: [
          "Utiliser des chiffons microfibre évite les traces",
          "Éviter les produits agressifs sur les vitres teintées",
          "Nettoyer régulièrement maintient une visibilité optimale",
          "Un nettoyage soigneux élimine les buées persistantes",
          "Travailler dans un mouvement uniforme évite les traces",
        ],
        recommendedProducts: [
          { productName: "GLASS CLEANER PLUS" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Désodorisation et traitement des odeurs",
        content:
          "L'élimination des odeurs est essentielle pour un habitacle agréable. Différentes techniques permettent de traiter les odeurs persistantes et de maintenir une fraîcheur durable.",
        steps: [
          "Identifiez la source des odeurs : tabac, animaux, nourriture, etc.",
          "Nettoyez d'abord toutes les surfaces pour éliminer les résidus",
          "Aspirez soigneusement les tapis et moquettes",
          "Appliquez un désodorisant spécifique selon le type d'odeur",
          "Pour les odeurs tenaces, utilisez un traitement à l'ozone si disponible",
          "Placez un désodorisant de longue durée dans l'habitacle",
          "Ventilez régulièrement l'habitacle",
          "Répétez le traitement si nécessaire",
        ],
        tips: [
          "Éliminer la source de l'odeur est plus efficace que la masquer",
          "Un nettoyage approfondi élimine souvent les odeurs",
          "Ventiler régulièrement maintient la fraîcheur",
          "Les désodorisants naturels sont préférables aux parfums forts",
          "Traiter rapidement évite que les odeurs ne s'incrustent",
        ],
        recommendedProducts: [
          { productName: "FANTASIE DI ELISIR BLUE" },
          { productName: "FANTASIE DI ELISIR FRESH LIME" },
          { productName: "FANTASIE DI ELISIR ICE FOREST" },
          { productName: "FANTASIE DI ELISIR IRIS BLOOM" },
          { productName: "FANTASIE DI ELISIR RELAX SENSATION" },
          { productName: "DIAMANTPLAST SHINE SPRAY" },
        ],
      },
      {
        title: "Entretien des tapis et moquettes de sol",
        content:
          "Les tapis et moquettes de sol sont les zones les plus exposées à la saleté. Un entretien régulier et approfondi maintient leur propreté et leur aspect.",
        steps: [
          "Retirez les tapis du véhicule si possible",
          "Secouez vigoureusement pour éliminer la poussière",
          "Aspirez soigneusement les deux faces",
          "Traitez les taches avec un nettoyant pour tissus",
          "Lavez avec un nettoyant adapté et une brosse",
          "Rincez abondamment à l'eau claire",
          "Laissez sécher complètement avant de remettre en place",
          "Pour les moquettes fixées, utilisez un extracteur si disponible",
        ],
        tips: [
          "Retirer les tapis facilite le nettoyage approfondi",
          "Un séchage complet évite les moisissures",
          "Traiter les taches rapidement améliore les résultats",
          "Un nettoyage régulier évite l'accumulation de saleté",
          "Protéger les tapis avec des housses améliore leur durée de vie",
        ],
        recommendedProducts: [
          { productName: "DEO-CUBE OCEAN" },
          { productName: "FANTASIE DI ELISIR IRIS BLOOM" },
          { productName: "TRAITEMENT 3/1 TISSUS" },
          { productName: "Lot 6 microfibre" },
        ],
      },
      {
        title: "Entretien régulier et maintenance préventive",
        content:
          "Un entretien régulier maintient l'habitacle en parfait état et évite l'accumulation de saleté. Une maintenance préventive prolonge la durée de vie des matériaux.",
        steps: [
          "Aspirez l'habitacle toutes les semaines ou toutes les deux semaines",
          "Nettoyez les plastiques avec un chiffon microfibre humide",
          "Traitez les taches dès leur apparition",
          "Conditionnez le cuir tous les 3-4 mois",
          "Nettoyez les vitres intérieures régulièrement",
          "Ventilez l'habitacle régulièrement",
          "Évitez de manger dans le véhicule pour réduire les salissures",
          "Utilisez des protections (housses de siège, tapis) si nécessaire",
        ],
        tips: [
          "Un entretien régulier évite les nettoyages approfondis fréquents",
          "Traiter rapidement les problèmes évite qu'ils ne s'aggravent",
          "Protéger les surfaces sensibles prolonge leur durée de vie",
          "Un habitacle propre améliore le confort et la valeur du véhicule",
          "Adapter la fréquence selon l'utilisation du véhicule",
        ],
        recommendedProducts: [
          { productName: "DIAMANTPLAST SHINE SPRAY" },
          { productName: "Conditionneur cuir" },
          { productName: "Lot 6 microfibre" },
        ],
      },
    ],
  },
  {
    id: "choix-produits",
    title: "Choix des Produits",
    subtitle: "Guide complet pour choisir les bons produits selon vos besoins",
    description:
      "Comprenez quels produits utiliser selon vos besoins, votre type de véhicule et vos objectifs. Découvrez les différences entre produits professionnels et particuliers, et apprenez à lire les compositions.",
    keywords:
      "choix produits auto, produits professionnels, produits particuliers, composition produits, efficacité produits, guide produits MA-FRA",
    intro:
      "Choisir les bons produits est essentiel pour obtenir des résultats optimaux. Chaque produit a ses spécificités et son domaine d'application. Ce guide vous aide à faire les bons choix selon vos besoins.",
    articles: [
      {
        title: "Comprendre les catégories de produits",
        content:
          "Les produits d'entretien automobile sont organisés en catégories selon leur usage. Comprendre ces catégories facilite le choix des produits adaptés à vos besoins.",
        steps: [
          "Lavage : shampooings, prélavages, nettoyants spécifiques",
          "Polissage : compounds, polish, pads de polissage",
          "Protection : cires, sealants, protections céramiques",
          "Intérieur : nettoyants plastiques, cuir, tissus, désodorisants",
          "Spécialisés : nettoyants jantes, phares, chrome, etc.",
          "Accessoires : chiffons, applicateurs, brosses, pads",
        ],
        tips: [
          "Chaque catégorie répond à un besoin spécifique",
          "Combiner plusieurs catégories permet un entretien complet",
          "Les produits spécialisés offrent de meilleurs résultats",
          "Les accessoires sont essentiels pour une application correcte",
          "Comprendre les catégories facilite l'organisation de l'entretien",
        ],
      },
      {
        title: "Produits professionnels vs produits particuliers",
        content:
          "Les produits professionnels et particuliers diffèrent par leur concentration, leur efficacité et leur domaine d'application. Comprendre ces différences aide à faire le bon choix.",
        steps: [
          "Produits professionnels : concentration élevée, efficacité maximale, usage intensif",
          "Produits particuliers : formulation équilibrée, facilité d'utilisation, usage régulier",
          "Professionnels : nécessitent souvent dilution et technique précise",
          "Particuliers : prêts à l'emploi, application simplifiée",
          "Professionnels : résultats optimaux mais nécessitent plus d'expertise",
          "Particuliers : résultats très bons avec facilité d'utilisation",
        ],
        tips: [
          "Les professionnels offrent meilleur rapport qualité/prix à long terme",
          "Les particuliers sont plus adaptés pour un usage occasionnel",
          "La concentration des professionnels permet plus d'applications",
          "Choisir selon votre fréquence d'utilisation et votre niveau",
          "Les deux types peuvent être complémentaires",
        ],
      },
      {
        title: "Choisir selon le type de véhicule",
        content:
          "Le type de véhicule influence le choix des produits. Une voiture de collection, un véhicule quotidien ou un utilitaire ont des besoins différents.",
        steps: [
          "Véhicules de collection : produits doux, protection renforcée, entretien méticuleux",
          "Véhicules quotidiens : produits efficaces, entretien régulier, protection standard",
          "Utilitaires : produits puissants, nettoyage fréquent, résistance aux agressions",
          "Véhicules neufs : produits doux, protection préventive",
          "Véhicules anciens : produits adaptés aux finitions, rénovation si nécessaire",
          "Véhicules de sport : produits haute performance, protection renforcée",
        ],
        tips: [
          "Adapter les produits selon l'âge et l'état du véhicule",
          "Les véhicules neufs nécessitent moins de correction",
          "Les véhicules anciens peuvent nécessiter des produits spécifiques",
          "L'utilisation du véhicule influence le choix des produits",
          "Consulter les recommandations du constructeur si disponibles",
        ],
      },
      {
        title: "Composition et efficacité des produits",
        content:
          "Comprendre la composition des produits aide à choisir selon vos besoins et à éviter les incompatibilités. Chaque ingrédient a un rôle spécifique.",
        steps: [
          "Détergents : nettoyage et élimination de la saleté",
          "Abrasifs : correction des imperfections (compounds, polish)",
          "Cires et polymères : protection et brillance",
          "Solvants : dissolution des résidus et graisses",
          "Additifs : amélioration des propriétés (UV, hydrophobie)",
          "pH : acidité/alcalinité selon l'usage (nettoyage, protection)",
        ],
        tips: [
          "Lire les compositions aide à comprendre l'efficacité",
          "Éviter les mélanges de produits incompatibles",
          "Respecter les dilutions recommandées",
          "Les produits concentrés offrent meilleur rapport qualité/prix",
          "Tester sur une zone discrète avant application complète",
        ],
      },
      {
        title: "Accessoires essentiels pour l'application",
        content:
          "Les bons accessoires sont essentiels pour une application correcte et des résultats optimaux. Chaque type d'accessoire a son utilité spécifique.",
        steps: [
          "Chiffons microfibre : application, retrait, séchage (qualité essentielle)",
          "Applicateurs : application précise de cires et sealants",
          "Pads de polissage : correction et polissage avec machine",
          "Brosses : nettoyage des zones difficiles (jantes, joints)",
          "Seaux : méthode des deux seaux pour lavage sans rayures",
          "Gants : protection des mains et application de produits",
        ],
        tips: [
          "Investir dans des accessoires de qualité améliore les résultats",
          "Avoir plusieurs chiffons évite de mélanger les produits",
          "Les pads de qualité durent plus longtemps",
          "Nettoyer régulièrement les accessoires maintient leur efficacité",
          "Choisir les accessoires selon les produits utilisés",
        ],
      },
      {
        title: "Kits et ensembles : avantages et choix",
        content:
          "Les kits et ensembles offrent une solution complète pour un entretien spécifique. Ils combinent produits et accessoires pour un résultat optimal.",
        steps: [
          "Kits lavage : shampooing, accessoires, produits complémentaires",
          "Kits polissage : compounds, polish, pads, accessoires",
          "Kits protection : cire, sealant, applicateurs, chiffons",
          "Kits intérieur : nettoyants, conditionneurs, accessoires",
          "Kits complets : solution tout-en-un pour entretien complet",
        ],
        tips: [
          "Les kits offrent souvent un meilleur rapport qualité/prix",
          "Ils garantissent la compatibilité des produits",
          "Ils simplifient le choix pour les débutants",
          "Ils peuvent être complétés avec des produits individuels",
          "Choisir selon vos besoins spécifiques",
        ],
      },
      {
        title: "Économie et rapport qualité/prix",
        content:
          "Choisir les bons produits permet d'optimiser le rapport qualité/prix. Les produits concentrés et de qualité offrent souvent la meilleure valeur.",
        steps: [
          "Produits concentrés : plus d'applications, meilleur rapport qualité/prix",
          "Qualité professionnelle : efficacité supérieure, durée de vie plus longue",
          "Acheter en quantité : économies sur les produits fréquemment utilisés",
          "Kits : souvent meilleur prix que produits individuels",
          "Éviter les produits bas de gamme : résultats médiocres, plus d'applications nécessaires",
        ],
        tips: [
          "Investir dans la qualité économise à long terme",
          "Les produits concentrés nécessitent dilution mais durent plus longtemps",
          "Comparer le prix par application plutôt que le prix unitaire",
          "Les produits de qualité nécessitent moins de réapplications",
          "Un bon entretien prolonge l'efficacité des produits",
        ],
      },
    ],
  },
  {
    id: "programme-entretien",
    title: "Programme d'Entretien",
    subtitle: "Calendrier et planification pour un entretien optimal",
    description:
      "Établissez un programme d'entretien régulier pour préserver votre véhicule dans le temps. Découvrez les fréquences recommandées selon les conditions d'utilisation et les saisons.",
    keywords:
      "programme entretien auto, calendrier lavage, entretien saisonnier, protection hivernale, maintenance préventive, fréquence lavage",
    intro:
      "Un entretien régulier et planifié préserve la valeur et l'aspect de votre véhicule. Adapter la fréquence selon l'utilisation, les conditions climatiques et les saisons garantit des résultats optimaux.",
    articles: [
      {
        title: "Fréquence de lavage selon l'utilisation",
        content:
          "La fréquence de lavage dépend de nombreux facteurs : environnement, utilisation, conditions climatiques. Adapter la fréquence optimise l'entretien.",
        steps: [
          "Véhicule quotidien en ville : toutes les 2-3 semaines",
          "Véhicule garé en extérieur : toutes les 2 semaines",
          "Véhicule garé en garage : toutes les 3-4 semaines",
          "Bord de mer : toutes les semaines en période estivale",
          "Route salée (hiver) : toutes les 2 semaines",
          "Véhicule peu utilisé : toutes les 4-6 semaines",
          "Véhicule de collection : selon exposition et utilisation",
        ],
        tips: [
          "Adapter selon les conditions réelles d'utilisation",
          "Un lavage trop fréquent peut user la peinture",
          "Un lavage insuffisant laisse s'accumuler les agressions",
          "Les conditions difficiles nécessitent plus de lavages",
          "Observer l'état du véhicule pour ajuster la fréquence",
        ],
      },
      {
        title: "Entretien saisonnier : printemps et été",
        content:
          "Le printemps et l'été nécessitent un entretien spécifique. Le pollen, les insectes, le soleil et la chaleur nécessitent des soins adaptés.",
        steps: [
          "Printemps : nettoyage approfondi après l'hiver, décontamination, protection renouvelée",
          "Été : lavage fréquent pour éliminer insectes et pollen",
          "Protection UV renforcée avant l'été",
          "Nettoyage des phares et optiques régulier",
          "Entretien des jantes plus fréquent (poussière de frein)",
          "Vérification et renouvellement de la protection",
          "Nettoyage intérieur plus fréquent (chaleur, transpiration)",
        ],
        tips: [
          "Le printemps est idéal pour une rénovation complète",
          "Éliminer les insectes rapidement évite les dommages",
          "La protection UV est essentielle en été",
          "Un entretien régulier maintient l'éclat malgré la chaleur",
          "Adapter la fréquence selon les conditions locales",
        ],
      },
      {
        title: "Protection et entretien hivernal",
        content:
          "L'hiver est la saison la plus agressive pour la carrosserie. Le sel, le froid et l'humidité nécessitent une protection renforcée et un entretien adapté.",
        steps: [
          "Préparation avant l'hiver : nettoyage approfondi, protection renforcée",
          "Application d'un sealant ou plusieurs couches de cire",
          "Lavage régulier toutes les 2 semaines pour éliminer le sel",
          "Séchage soigneux après chaque lavage",
          "Protection des zones sensibles (bas de caisse, passages de roues)",
          "Nettoyage des jantes plus fréquent",
          "Vérification et renouvellement de la protection en milieu d'hiver",
        ],
        tips: [
          "Une protection renforcée avant l'hiver est essentielle",
          "Le sel de déneigement est très agressif",
          "Les lavages réguliers préservent la protection",
          "Sécher soigneusement évite la corrosion",
          "Un entretien hivernal approprié réduit les dommages",
        ],
      },
      {
        title: "Programme d'entretien mensuel",
        content:
          "Un programme mensuel régulier maintient votre véhicule en parfait état. Planifier les tâches mensuelles facilite l'organisation et garantit un entretien complet.",
        steps: [
          "Semaine 1 : Lavage extérieur complet",
          "Semaine 2 : Nettoyage intérieur (aspiration, plastiques)",
          "Semaine 3 : Nettoyage approfondi des jantes et pneus",
          "Semaine 4 : Inspection générale et entretien des zones oubliées",
          "Chaque mois : Vérification de l'état de la protection",
          "Tous les 2-3 mois : Renouvellement de la protection",
          "Tous les 3-4 mois : Conditionnement du cuir",
        ],
        tips: [
          "Répartir les tâches facilite l'organisation",
          "Un entretien régulier évite les nettoyages approfondis",
          "Adapter selon vos disponibilités et besoins",
          "Tenir un calendrier aide à ne rien oublier",
          "Un entretien mensuel maintient un véhicule impeccable",
        ],
      },
      {
        title: "Maintenance préventive et inspection",
        content:
          "Une maintenance préventive régulière détecte les problèmes tôt et prévient les dommages. Inspecter régulièrement permet d'anticiper les besoins d'entretien.",
        steps: [
          "Inspection visuelle régulière de la carrosserie",
          "Détection précoce des rayures et imperfections",
          "Vérification de l'état de la protection",
          "Inspection des phares et optiques",
          "Vérification de l'état des jantes",
          "Inspection de l'habitacle (taches, usure)",
          "Planification des corrections et rénovations nécessaires",
        ],
        tips: [
          "Une inspection régulière détecte les problèmes tôt",
          "Traiter rapidement évite l'aggravation",
          "Planifier les corrections selon les priorités",
          "Un entretien préventif économise à long terme",
          "Adapter le programme selon les observations",
        ],
      },
      {
        title: "Programme d'entretien pour véhicules de collection",
        content:
          "Les véhicules de collection nécessitent un entretien spécifique et méticuleux. Préserver leur valeur et leur authenticité nécessite des techniques adaptées.",
        steps: [
          "Lavage très doux avec produits spécifiques",
          "Protection renforcée avec produits de qualité",
          "Stockage dans un environnement contrôlé",
          "Entretien régulier même si peu utilisé",
          "Documentation de l'entretien effectué",
          "Éviter les produits agressifs",
          "Consultation de spécialistes si nécessaire",
        ],
        tips: [
          "Les véhicules de collection nécessitent des soins particuliers",
          "Préserver l'authenticité est essentiel",
          "Un stockage approprié prolonge la durée de vie",
          "Documenter l'entretien ajoute de la valeur",
          "Consulter des experts pour les véhicules précieux",
        ],
      },
      {
        title: "Adaptation du programme selon les conditions",
        content:
          "Adapter le programme d'entretien selon les conditions réelles optimise les résultats. Chaque situation nécessite des ajustements spécifiques.",
        steps: [
          "Conditions difficiles : augmenter la fréquence de lavage",
          "Environnement urbain : nettoyage plus fréquent des jantes",
          "Bord de mer : protection renforcée, lavage fréquent",
          "Garage fermé : réduire la fréquence, maintenir la protection",
          "Utilisation intensive : entretien plus fréquent",
          "Conditions normales : suivre le programme standard",
          "Ajuster selon les observations et résultats",
        ],
        tips: [
          "Observer l'état du véhicule pour ajuster",
          "Les conditions difficiles nécessitent plus d'attention",
          "Adapter progressivement selon les résultats",
          "Un programme flexible est plus efficace",
          "Tenir compte de tous les facteurs environnementaux",
        ],
      },
    ],
  },
];

