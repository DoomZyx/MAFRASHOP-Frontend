import "./cgv.scss";
import Nav from "../../../components/nav/nav";
import Footer from "../../../components/footer/footer";
import LegalPageHeader from "../../../components/legal/LegalPageHeader/LegalPageHeader";
import LegalSection from "../../../components/legal/LegalSection/LegalSection";
import LegalArticle from "../../../components/legal/LegalArticle/LegalArticle";

function CGV() {
    return (
        <div className="cgv-page">
            <Nav />
            <div className="cgv-container">
                <LegalPageHeader 
                    title="Conditions Générales de Vente"
                    lastUpdate="Janvier 2026"
                />

                <div className="cgv-content">
                    <LegalSection className="legal-intro">
                        <p>
                            Les présentes Conditions Générales de Vente (CGV) régissent les ventes 
                            de produits d'entretien automobile de la marque MA-FRA effectuées par 
                            MAFRA SHOP sur son site internet.
                        </p>
                        <p>
                            Toute commande implique l'acceptation sans réserve des présentes CGV.
                        </p>
                    </LegalSection>

                    <LegalArticle title="Article 1 - Objet">
                        <p>
                            Les présentes conditions générales de vente régissent les ventes de 
                            produits d'entretien automobile de la marque MA-FRA par MAFRA SHOP, 
                            revendeur agréé, sur son site internet.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 2 - Produits">
                        <p>
                            MAFRA SHOP propose à la vente plus de 100 produits d'entretien automobile 
                            de la marque MA-FRA, répartis dans les catégories suivantes :
                        </p>
                        <ul>
                            <li>Lavage (shampooings, prélavages, nettoyants jantes et vitres)</li>
                            <li>Polissage (polishs, compounds, lustreurs, efface-rayures)</li>
                            <li>Protection (cires, sealants, protections céramiques, traitements hydrophobes)</li>
                            <li>Intérieur (nettoyants plastiques, cuir, tissus, désodorisants)</li>
                            <li>Accessoires (microfibres, applicateurs, brosses, seaux)</li>
                            <li>Gamme professionnelle (formats professionnels, produits concentrés, bidons de 5L et plus)</li>
                        </ul>
                    </LegalArticle>

                    <LegalArticle title="Article 3 - Prix">
                        <p>
                            Les prix des produits sont indiqués en euros toutes taxes comprises (TTC) 
                            pour les particuliers, incluant la TVA au taux en vigueur (20%).
                        </p>
                        <p>
                            Pour les professionnels établis en France, les prix sont affichés hors taxes 
                            (HT) et la TVA de 20% est ajoutée lors du paiement.
                        </p>
                        <p>
                            Pour les professionnels établis dans un autre pays de l'Union Européenne 
                            disposant d'un numéro de TVA intracommunautaire validé, les prix sont 
                            affichés et facturés hors taxes (HT) sans application de la TVA française, 
                            conformément au mécanisme d'autoliquidation de la TVA.
                        </p>
                        <p>
                            Les prix peuvent être modifiés à tout moment. Le prix applicable est celui 
                            en vigueur au moment de la validation de la commande.
                        </p>
                        <p>
                            Les produits restent la propriété de MAFRA SHOP jusqu'au paiement complet 
                            du prix.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 4 - Frais de Livraison">
                        <p>
                            Les frais de livraison s'élèvent à 7,50 € par commande.
                        </p>
                        <p>
                            Les frais de livraison sont offerts pour toute commande d'un montant égal 
                            ou supérieur à 120 € (hors TVA pour les professionnels, TTC pour les particuliers).
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 5 - Commandes">
                        <p>
                            Les commandes sont passées exclusivement via le site internet de MAFRA SHOP.
                        </p>
                        <p>
                            Pour passer commande, le client doit créer un compte utilisateur et renseigner 
                            ses coordonnées complètes (nom, prénom, adresse de livraison, email, téléphone).
                        </p>
                        <p>
                            Les professionnels doivent fournir leur numéro SIRET (pour les entreprises 
                            françaises) ou leur numéro de TVA intracommunautaire (pour les entreprises 
                            de l'Union Européenne) lors de la création de leur compte professionnel.
                        </p>
                        <p>
                            MAFRA SHOP se réserve le droit de refuser ou d'annuler toute commande en cas 
                            de litige avec le client, de problème d'approvisionnement, ou si les 
                            informations fournies sont incomplètes ou erronées.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 6 - Validation de la Commande">
                        <p>
                            La validation d'une commande implique l'acceptation pleine et entière des 
                            présentes Conditions Générales de Vente.
                        </p>
                        <p>
                            Après validation de la commande, un email de confirmation contenant le 
                            récapitulatif de la commande est envoyé au client.
                        </p>
                        <p>
                            La commande devient définitive après réception du paiement.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 7 - Paiement">
                        <p>
                            Le paiement s'effectue exclusivement par carte bancaire via la plateforme 
                            de paiement sécurisée Stripe.
                        </p>
                        <p>
                            Le débit de la carte bancaire est effectué au moment de la validation du 
                            paiement.
                        </p>
                        <p>
                            Les données de paiement sont cryptées et ne sont jamais conservées par 
                            MAFRA SHOP.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 8 - Disponibilité">
                        <p>
                            Les produits sont proposés dans la limite des stocks disponibles.
                        </p>
                        <p>
                            En cas d'indisponibilité d'un produit après validation de la commande, 
                            MAFRA SHOP s'engage                             à en informer le client dans les meilleurs délais et 
                            à procéder au remboursement du produit indisponible.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 9 - Livraison">
                        <p>
                            Les livraisons sont effectuées partout en France et les pays voisins.
                        </p>
                        <p>
                            La livraison est effectuée en main propre par un employé de MAFRA SHOP à 
                            l'adresse indiquée lors de la commande.
                        </p>
                        <p>
                            Le délai de livraison est de 72 heures ouvrées à compter de la validation 
                            de la commande et du paiement.
                        </p>
                        <p>
                            La date de livraison est communiquée au client par email. Aucun numéro de 
                            suivi n'est fourni, la livraison étant effectuée directement par MAFRA SHOP.
                        </p>
                        <p>
                            En cas d'absence du client lors de la livraison, un second passage sera 
                            proposé. Si le client reste indisponible après plusieurs tentatives, la 
                            commande pourra être annulée et les frais de livraison resteront dus.
                        </p>
                        <p>
                            Les risques liés au transport sont transférés au client dès la remise en 
                            main propre des produits.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 10 - Droit de Rétractation">
                        <p>
                            Conformément aux articles L221-18 et suivants du Code de la consommation, 
                            le client dispose d'un délai de 14 jours à compter de la réception de la 
                            commande pour exercer son droit de rétractation, sans avoir à justifier de 
                            motif ni à payer de pénalité.
                        </p>
                        <p>
                            Pour exercer ce droit, le client doit contacter le service client de 
                            MAFRA SHOP par email en indiquant son numéro de commande et sa volonté de 
                            se rétracter.
                        </p>
                        <p>
                            Les produits retournés doivent être dans leur emballage d'origine scellé, 
                            non ouvert et non utilisé. Pour des raisons d'hygiène et de sécurité, les 
                            produits d'entretien automobile ouverts ou entamés ne peuvent être repris.
                        </p>
                        <p>
                            L'adresse de retour est communiquée par email par le service client.
                        </p>
                        <p>
                            Les frais de retour sont à la charge du client en cas d'exercice du droit 
                            de rétractation.
                        </p>
                        <p>
                            Le remboursement du prix du produit (hors frais de livraison initiaux) est 
                            effectué après réception et vérification du produit retourné, dans un délai 
                            maximum de 14 jours à compter de la réception du produit.
                        </p>
                        <p>
                            Le remboursement est effectué sur le moyen de paiement utilisé lors de l'achat.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 11 - Produits Défectueux ou Non Conformes">
                        <p>
                            En cas de réception d'un produit défectueux, endommagé ou non conforme à 
                            la commande, le client doit le signaler au service client dans un délai de 
                            48 heures suivant la réception, en fournissant son numéro de commande et 
                            des photos du défaut ou de la non-conformité.
                        </p>
                        <p>
                            Après vérification, MAFRA SHOP procédera au remplacement du produit ou au 
                            remboursement, selon la disponibilité du produit.
                        </p>
                        <p>
                            Les frais de retour et de réexpédition sont pris en charge par MAFRA SHOP 
                            en cas de produit défectueux ou non conforme.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 12 - Garanties Légales">
                        <p>
                            Tous les produits vendus par MAFRA SHOP bénéficient de la garantie légale 
                            de conformité (articles L217-4 et suivants du Code de la consommation) et 
                            de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).
                        </p>
                        <p>
                            Le client peut choisir entre la réparation ou le remplacement du bien, sous 
                            réserve des conditions de coût prévues par l'article L217-9 du Code de la 
                            consommation.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 13 - Données Personnelles">
                        <p>
                            Les données personnelles collectées lors de la commande sont nécessaires au 
                            traitement et à la livraison de la commande.
                        </p>
                        <p>
                            Conformément au Règlement Général sur la Protection des Données (RGPD) et à 
                            la loi Informatique et Libertés, le client dispose d'un droit d'accès, de 
                            rectification, de suppression et d'opposition aux données le concernant.
                        </p>
                        <p>
                            Pour exercer ces droits, le client peut contacter le service client par email.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 14 - Service Client">
                        <p>
                            Le service client de MAFRA SHOP est disponible du lundi au vendredi de 9h 
                            à 18h par email.
                        </p>
                        <p>
                            Pour toute question concernant une commande, un produit, une livraison ou 
                            un retour, le client peut contacter par mail ou par téléphone.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Article 15 - Droit Applicable et Litiges">
                        <p>
                            Les présentes Conditions Générales de Vente sont soumises au droit français.
                        </p>
                        <p>
                            En cas de litige, une solution amiable sera recherchée avant toute action 
                            judiciaire.
                        </p>
                        <p>
                            Conformément aux articles L611-1 et R612-1 et suivants du Code de la 
                            consommation, le client peut recourir gratuitement à un médiateur de la 
                            consommation en vue de la résolution amiable du litige.
                        </p>
                        <p>
                            À défaut de résolution amiable, le litige sera porté devant les tribunaux 
                            compétents.
                        </p>
                    </LegalArticle>

                    <LegalSection className="legal-footer-section">
                        <p>
                            Pour toute question concernant les présentes Conditions Générales de Vente, 
                            vous pouvez contacter notre service client.
                        </p>
                        <a href="/sav" className="legal-contact-button">
                            Contacter le service client
                        </a>
                    </LegalSection>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CGV;
