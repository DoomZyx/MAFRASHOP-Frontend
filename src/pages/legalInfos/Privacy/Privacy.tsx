import "./Privacy.scss";
import Nav from "../../../components/nav/nav";
import Footer from "../../../components/footer/footer";
import LegalPageHeader from "../../../components/legal/LegalPageHeader/LegalPageHeader";
import LegalSection from "../../../components/legal/LegalSection/LegalSection";
import LegalArticle from "../../../components/legal/LegalArticle/LegalArticle";
import SEO from "../../../components/shared/SEO";

function Privacy() {
    return (
        <div className="privacy-page">
            <SEO
                title="Politique de Confidentialité - Protection des Données"
                description="Découvrez comment MAFRA SHOP collecte, utilise et protège vos données personnelles conformément au RGPD et à la loi Informatique et Libertés."
                keywords="politique de confidentialité, protection des données, RGPD, données personnelles, vie privée"
                url="/privacy"
            />
            <Nav />
            <div className="privacy-container">
                <LegalPageHeader 
                    title="Politique de Confidentialité"
                    lastUpdate="Janvier 2026"
                />

                <div className="privacy-content">
                    <LegalSection className="legal-intro">
                        <p>
                            MAFRA SHOP s'engage à protéger la vie privée et les données personnelles 
                            de ses utilisateurs. La présente politique de confidentialité décrit comment 
                            nous collectons, utilisons, stockons et protégeons vos données personnelles 
                            conformément au Règlement Général sur la Protection des Données (RGPD) et 
                            à la loi Informatique et Libertés.
                        </p>
                    </LegalSection>

                    <LegalArticle title="1. Responsable du Traitement">
                        <p>
                            Le responsable du traitement des données personnelles est MAFRA SHOP.
                        </p>
                        <p>
                            Pour toute question relative à la protection de vos données personnelles, 
                            vous pouvez nous contacter via le formulaire de contact disponible sur notre site.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="2. Données Collectées">
                        <p>
                            Nous collectons les données personnelles suivantes :
                        </p>
                        
                        <h3>2.1. Données d'identification</h3>
                        <ul>
                            <li>Nom et prénom</li>
                            <li>Adresse email</li>
                            <li>Numéro de téléphone</li>
                            <li>Adresse postale de livraison</li>
                        </ul>

                        <h3>2.2. Données de compte</h3>
                        <ul>
                            <li>Identifiants de connexion (email et mot de passe crypté)</li>
                            <li>Historique des commandes</li>
                            <li>Préférences de compte</li>
                        </ul>

                        <h3>2.3. Données professionnelles (pour les comptes professionnels)</h3>
                        <ul>
                            <li>Raison sociale</li>
                            <li>Numéro SIRET (entreprises françaises)</li>
                            <li>Numéro de TVA intracommunautaire (entreprises UE)</li>
                            <li>Pays d'établissement</li>
                            <li>Adresse de l'entreprise</li>
                        </ul>

                        <h3>2.4. Données de paiement</h3>
                        <ul>
                            <li>Informations de paiement (traitées par Stripe, non stockées par MAFRA SHOP)</li>
                            <li>Historique des transactions</li>
                        </ul>

                        <h3>2.5. Données de navigation</h3>
                        <ul>
                            <li>Adresse IP</li>
                            <li>Type de navigateur</li>
                            <li>Pages visitées</li>
                            <li>Cookies (avec votre consentement)</li>
                        </ul>
                    </LegalArticle>

                    <LegalArticle title="3. Finalités du Traitement">
                        <p>
                            Vos données personnelles sont collectées et traitées pour les finalités suivantes :
                        </p>

                        <h3>3.1. Gestion des commandes</h3>
                        <ul>
                            <li>Traitement et suivi de vos commandes</li>
                            <li>Préparation et livraison des produits</li>
                            <li>Facturation</li>
                            <li>Gestion des retours et remboursements</li>
                        </ul>
                        <p className="legal-basis">
                            <strong>Base légale :</strong> Exécution du contrat de vente
                        </p>

                        <h3>3.2. Gestion du compte utilisateur</h3>
                        <ul>
                            <li>Création et gestion de votre compte</li>
                            <li>Authentification et sécurisation de l'accès</li>
                            <li>Historique des commandes</li>
                        </ul>
                        <p className="legal-basis">
                            <strong>Base légale :</strong> Exécution du contrat et consentement
                        </p>

                        <h3>3.3. Vérification des comptes professionnels</h3>
                        <ul>
                            <li>Vérification du numéro SIRET auprès de l'INSEE</li>
                            <li>Vérification du numéro de TVA intracommunautaire auprès de VIES</li>
                            <li>Application du régime fiscal approprié</li>
                        </ul>
                        <p className="legal-basis">
                            <strong>Base légale :</strong> Obligation légale (conformité fiscale)
                        </p>

                        <h3>3.4. Service client</h3>
                        <ul>
                            <li>Réponse à vos demandes et réclamations</li>
                            <li>Support technique</li>
                            <li>Gestion des litiges</li>
                        </ul>
                        <p className="legal-basis">
                            <strong>Base légale :</strong> Exécution du contrat et intérêt légitime
                        </p>

                        <h3>3.5. Obligations légales</h3>
                        <ul>
                            <li>Conservation des factures et documents comptables</li>
                            <li>Lutte contre la fraude</li>
                            <li>Respect des obligations fiscales</li>
                        </ul>
                        <p className="legal-basis">
                            <strong>Base légale :</strong> Obligation légale
                        </p>

                        <h3>3.6. Amélioration de nos services (avec votre consentement)</h3>
                        <ul>
                            <li>Analyse statistique de la navigation</li>
                            <li>Amélioration de l'expérience utilisateur</li>
                        </ul>
                        <p className="legal-basis">
                            <strong>Base légale :</strong> Consentement (cookies analytiques)
                        </p>
                    </LegalArticle>

                    <LegalArticle title="4. Destinataires des Données">
                        <p>
                            Vos données personnelles sont destinées aux personnes et entités suivantes :
                        </p>
                        <ul>
                            <li>
                                <strong>Personnel autorisé de MAFRA SHOP :</strong> Employés en charge 
                                de la gestion des commandes, du service client et de la livraison
                            </li>
                            <li>
                                <strong>Prestataires de services :</strong>
                                <ul>
                                    <li>Stripe : Traitement sécurisé des paiements</li>
                                    <li>Hébergeur du site web</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Services publics :</strong>
                                <ul>
                                    <li>INSEE : Vérification des numéros SIRET</li>
                                    <li>VIES (Commission Européenne) : Vérification des numéros de TVA intracommunautaire</li>
                                </ul>
                            </li>
                            <li>
                                <strong>Autorités compétentes :</strong> En cas d'obligation légale 
                                (administration fiscale, autorités judiciaires)
                            </li>
                        </ul>
                        <p>
                            Aucune donnée personnelle n'est vendue ou louée à des tiers à des fins commerciales.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="5. Durée de Conservation">                        <p>
                            Vos données personnelles sont conservées pendant les durées suivantes :
                        </p>
                        <ul>
                            <li>
                                <strong>Données de compte actif :</strong> Tant que votre compte est actif, 
                                puis 3 ans après la dernière activité
                            </li>
                            <li>
                                <strong>Données de commande et factures :</strong> 10 ans (obligation légale comptable)
                            </li>
                            <li>
                                <strong>Données de paiement :</strong> 13 mois (obligation légale bancaire)
                            </li>
                            <li>
                                <strong>Cookies :</strong> 13 mois maximum
                            </li>
                            <li>
                                <strong>Données de prospection :</strong> 3 ans à compter du dernier contact
                            </li>
                        </ul>
                        <p>
                            À l'issue de ces durées, vos données sont supprimées ou anonymisées de manière 
                            irréversible.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="6. Sécurité des Données">
                        <p>
                            MAFRA SHOP met en œuvre toutes les mesures techniques et organisationnelles 
                            appropriées pour protéger vos données personnelles contre :
                        </p>
                        <ul>
                            <li>La destruction accidentelle ou illicite</li>
                            <li>La perte accidentelle</li>
                            <li>L'altération</li>
                            <li>La divulgation ou l'accès non autorisé</li>
                        </ul>
                        <p>
                            Ces mesures incluent notamment :
                        </p>
                        <ul>
                            <li>Cryptage des mots de passe</li>
                            <li>Connexion sécurisée HTTPS</li>
                            <li>Paiement sécurisé via Stripe (certifié PCI-DSS)</li>
                            <li>Accès restreint aux données personnelles</li>
                            <li>Sauvegardes régulières</li>
                        </ul>
                    </LegalArticle>

                    <LegalArticle title="7. Vos Droits">
                        <p>
                            Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des 
                            droits suivants concernant vos données personnelles :
                        </p>

                        <h3>7.1. Droit d'accès</h3>
                        <p>
                            Vous avez le droit d'obtenir la confirmation que des données vous concernant 
                            sont ou ne sont pas traitées et, lorsqu'elles le sont, l'accès à ces données.
                        </p>

                        <h3>7.2. Droit de rectification</h3>
                        <p>
                            Vous avez le droit d'obtenir la rectification de données inexactes ou incomplètes 
                            vous concernant.
                        </p>

                        <h3>7.3. Droit à l'effacement ("droit à l'oubli")</h3>
                        <p>
                            Vous avez le droit d'obtenir l'effacement de vos données personnelles, sauf si 
                            leur conservation est nécessaire pour respecter une obligation légale (ex: factures).
                        </p>

                        <h3>7.4. Droit à la limitation du traitement</h3>
                        <p>
                            Vous avez le droit d'obtenir la limitation du traitement de vos données dans 
                            certains cas prévus par le RGPD.
                        </p>

                        <h3>7.5. Droit à la portabilité</h3>
                        <p>
                            Vous avez le droit de recevoir vos données personnelles dans un format structuré, 
                            couramment utilisé et lisible par machine, et de les transmettre à un autre 
                            responsable de traitement.
                        </p>

                        <h3>7.6. Droit d'opposition</h3>
                        <p>
                            Vous avez le droit de vous opposer à tout moment au traitement de vos données 
                            personnelles pour des raisons tenant à votre situation particulière.
                        </p>

                        <h3>7.7. Droit de retirer votre consentement</h3>
                        <p>
                            Lorsque le traitement est fondé sur votre consentement, vous avez le droit de 
                            retirer ce consentement à tout moment (cookies, newsletter, etc.).
                        </p>

                        <h3>7.8. Droit de définir des directives post-mortem</h3>
                        <p>
                            Vous avez le droit de définir des directives relatives au sort de vos données 
                            après votre décès.
                        </p>

                        <div className="rights-exercise">
                            <h3>Comment exercer vos droits ?</h3>
                            <p>
                                Pour exercer vos droits, vous pouvez nous contacter :
                            </p>
                            <ul>
                                <li>Par email via notre formulaire de contact</li>
                                <li>En précisant votre demande et en joignant une copie de votre pièce d'identité</li>
                            </ul>
                            <p>
                                Nous nous engageons à répondre à votre demande dans un délai maximum d'un mois 
                                à compter de la réception de votre demande.
                            </p>
                        </div>
                    </LegalArticle>

                    <LegalArticle title="8. Cookies">                        <p>
                            Notre site utilise des cookies pour améliorer votre expérience de navigation. 
                            Pour plus d'informations sur les cookies que nous utilisons et comment les gérer, 
                            veuillez consulter notre <a href="/cookies">page de gestion des cookies</a>.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="9. Transfert de Données hors UE">
                        <p>
                            Vos données personnelles sont hébergées et traitées au sein de l'Union Européenne.
                        </p>
                        <p>
                            Certains prestataires (comme Stripe) peuvent transférer des données hors de l'UE. 
                            Dans ce cas, ces transferts sont encadrés par des garanties appropriées conformément 
                            au RGPD (clauses contractuelles types, Privacy Shield, etc.).
                        </p>
                    </LegalArticle>

                    <LegalArticle title="10. Mineurs">
                        <p>
                            Notre site et nos services ne sont pas destinés aux personnes de moins de 16 ans. 
                            Nous ne collectons pas sciemment de données personnelles concernant des mineurs 
                            de moins de 16 ans.
                        </p>
                        <p>
                            Si vous êtes parent ou tuteur légal et que vous découvrez que votre enfant nous 
                            a fourni des données personnelles, veuillez nous contacter afin que nous puissions 
                            supprimer ces données.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="11. Modifications de la Politique de Confidentialité">                       <p>
                            MAFRA SHOP se réserve le droit de modifier la présente politique de confidentialité 
                            à tout moment. Toute modification sera publiée sur cette page avec une nouvelle 
                            date de mise à jour.
                        </p>
                        <p>
                            Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance 
                            des éventuelles modifications.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="12. Réclamation auprès de la CNIL">
                        <p>
                            Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, 
                            vous avez le droit d'introduire une réclamation auprès de la Commission Nationale 
                            de l'Informatique et des Libertés (CNIL) :
                        </p>
                        <div className="cnil-info">
                            <p>
                                <strong>CNIL</strong><br />
                                3 Place de Fontenoy<br />
                                TSA 80715<br />
                                75334 PARIS CEDEX 07
                            </p>
                            <p>
                                Téléphone : 01 53 73 22 22<br />
                                Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
                            </p>
                        </div>
                    </LegalArticle>

                    <LegalSection className="legal-footer-section">
                        <p>
                            Pour toute question concernant la protection de vos données personnelles, 
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

export default Privacy;
