import "./Mentions.scss";
import Nav from "../../../components/nav/nav";
import Footer from "../../../components/footer/footer";
import LegalPageHeader from "../../../components/legal/LegalPageHeader/LegalPageHeader";
import LegalSection from "../../../components/legal/LegalSection/LegalSection";
import LegalArticle from "../../../components/legal/LegalArticle/LegalArticle";
import SEO from "../../../components/shared/SEO";

function Mentions() {
    return (
        <div className="mentions-page">
            <SEO
                title="Mentions Légales - Informations Légales"
                description="Consultez les mentions légales de MAFRA SHOP : éditeur, hébergeur, propriété intellectuelle et conditions d'utilisation du site."
                keywords="mentions légales, informations légales, éditeur, hébergeur, propriété intellectuelle"
                url="/mentions"
                noindex={true}
            />
            <Nav />
            <div className="mentions-container">
                <LegalPageHeader 
                    title="Mentions Légales"
                    lastUpdate="Janvier 2026"
                />

                <div className="mentions-content">
                    <LegalSection className="legal-intro">
                        <p>
                            Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 
                            du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., 
                            nous portons à la connaissance des utilisateurs et visiteurs du site les 
                            présentes mentions légales.
                        </p>
                    </LegalSection>

                    <LegalArticle title="1. Éditeur du Site">
                        <div className="mentions-info-box">
                            <p>
                                <strong>Raison sociale :</strong> SO CO FRA
                            </p>
                            <p>
                                <strong>Forme juridique :</strong> SARL
                            </p>
                            <p>
                                <strong>Siège social :</strong> 5 rue de la République, 57240 Knutange
                            </p>
                            <p>
                                <strong>SIRET :</strong> 44496772300024
                            </p>
                            <p>
                                <strong>Email :</strong> contact@mymafrashop.com
                            </p>
                            <p>
                                <strong>Téléphone :</strong> 06 08 49 94 32
                            </p>
                        </div>
                    </LegalArticle>

                    <LegalArticle title="2. Directeur de la Publication">
                        <p>
                            Le directeur de la publication du site est : Laigaisse Alain
                        </p>
                    </LegalArticle>

                    <LegalArticle title="3. Hébergement du Site">
                        <div className="mentions-info-box">
                            <p>
                                <strong>Hébergeur :</strong> OVH
                            </p>
                            <p>
                                <strong>Adresse :</strong> 2 RUE KELLERMANN 59100 ROUBAIX
                            </p>
                            <p>
                                <strong>Téléphone :</strong> 09 72 10 10 07
                            </p>
                        </div>
                    </LegalArticle>

                    <LegalArticle title="4. Objet du Site">
                        <p>
                            Le site MAFRA SHOP a pour objet la vente en ligne de produits d'entretien 
                            automobile de la marque MA-FRA.
                        </p>
                        <p>
                            MAFRA SHOP est un revendeur agréé de produits MA-FRA et propose plus de 100 
                            références destinées aux particuliers et aux professionnels.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="5. Conditions d'Utilisation">
                        <p>
                            L'utilisation du site MAFRA SHOP implique l'acceptation pleine et entière des 
                            conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation 
                            sont susceptibles d'être modifiées ou complétées à tout moment.
                        </p>
                        <p>
                            Les utilisateurs du site sont tenus de les consulter régulièrement.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="6. Propriété Intellectuelle">
                        <h3>6.1. Contenu du site</h3>
                        <p>
                            La structure générale, les textes, images animées ou non, savoir-faire, dessins, 
                            graphismes et tout autre élément composant le site sont la propriété exclusive 
                            de MAFRA SHOP ou de ses partenaires.
                        </p>
                        <p>
                            Toute représentation totale ou partielle de ce site par quelque procédé que ce 
                            soit, sans l'autorisation expresse de MAFRA SHOP est interdite et constituerait 
                            une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la 
                            propriété intellectuelle.
                        </p>

                        <h3>6.2. Marques</h3>
                        <p>
                            Les marques et logos figurant sur le site sont des marques déposées. Toute 
                            reproduction totale ou partielle de ces marques ou de ces logos effectuée à 
                            partir des éléments du site sans l'autorisation expresse de MAFRA SHOP ou de 
                            leurs propriétaires respectifs est donc prohibée.
                        </p>
                        <p>
                            MA-FRA est une marque déposée appartenant à MA-FRA S.p.A. (Italie).
                        </p>

                        <h3>6.3. Liens hypertextes</h3>
                        <p>
                            Le site peut contenir des liens hypertextes vers d'autres sites. MAFRA SHOP 
                            n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à 
                            leur contenu.
                        </p>
                        <p>
                            La création de liens hypertextes vers le site MAFRA SHOP nécessite l'autorisation 
                            préalable de MAFRA SHOP.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="7. Protection des Données Personnelles">
                        <p>
                            MAFRA SHOP s'engage à respecter la confidentialité des données personnelles 
                            communiquées par les utilisateurs du site.
                        </p>
                        <p>
                            Pour plus d'informations sur la collecte et le traitement de vos données 
                            personnelles, veuillez consulter notre{" "}
                            <a href="/privacy">Politique de Confidentialité</a>.
                        </p>
                        <p>
                            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la 
                            loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, 
                            de suppression et d'opposition aux données vous concernant.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="8. Cookies">
                        <p>
                            Le site utilise des cookies pour améliorer l'expérience utilisateur et réaliser 
                            des statistiques de visites.
                        </p>
                        <p>
                            Pour plus d'informations sur les cookies et leur gestion, veuillez consulter 
                            notre <a href="/cookies">page de gestion des cookies</a>.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="9. Responsabilité">
                        <h3>9.1. Contenu du site</h3>
                        <p>
                            MAFRA SHOP s'efforce d'assurer l'exactitude et la mise à jour des informations 
                            diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment 
                            et sans préavis, le contenu.
                        </p>
                        <p>
                            Toutefois, MAFRA SHOP ne peut garantir l'exactitude, la précision ou l'exhaustivité 
                            des informations mises à disposition sur ce site.
                        </p>

                        <h3>9.2. Disponibilité du site</h3>
                        <p>
                            MAFRA SHOP met tout en œuvre pour assurer la disponibilité du site 24h/24 et 7j/7. 
                            Néanmoins, MAFRA SHOP ne saurait être tenue responsable en cas d'interruption du 
                            service, qu'elle soit volontaire (maintenance, mise à jour) ou involontaire 
                            (panne technique, force majeure).
                        </p>

                        <h3>9.3. Virus informatiques</h3>
                        <p>
                            MAFRA SHOP ne peut être tenue responsable des dommages directs ou indirects causés 
                            au matériel de l'utilisateur lors de l'accès au site, et résultant soit de 
                            l'utilisation d'un matériel ne répondant pas aux spécifications, soit de 
                            l'apparition d'un bug ou d'une incompatibilité.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="10. Droit Applicable et Juridiction Compétente">
                        <p>
                            Les présentes mentions légales sont régies par le droit français.
                        </p>
                        <p>
                            En cas de litige et à défaut d'accord amiable, le litige sera porté devant les 
                            tribunaux français conformément aux règles de compétence en vigueur.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="11. Médiation de la Consommation">
                        <p>
                            Conformément aux articles L611-1 et R612-1 et suivants du Code de la consommation, 
                            nous proposons un dispositif de médiation de la consommation.
                        </p>
                        <p>
                            L'entité de médiation retenue est : [À compléter]
                        </p>
                        <p>
                            En cas de litige, vous pouvez déposer votre réclamation sur le site de résolution 
                            des litiges en ligne de la Commission Européenne :{" "}
                            <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=FR" target="_blank" rel="noopener noreferrer">
                                https://ec.europa.eu/consumers/odr
                            </a>
                        </p>
                    </LegalArticle>

                    <LegalArticle title="12. Crédits">
                        <p>
                            <strong>Conception et développement :</strong> Cella Axel
                        </p>
                        <p>
                            <strong>Crédits photographiques :</strong> Les images de produits sont fournies 
                            par MA-FRA S.p.A. ou sont la propriété de MAFRA SHOP.
                        </p>
                    </LegalArticle>

                    <LegalSection className="legal-footer-section">
                        <p>
                            Pour toute question concernant les présentes mentions légales, 
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

export default Mentions;
