import { useCookiesPage } from "../../../hooks/useCookiesPage";
import "./Cookies.scss";
import Nav from "../../../components/nav/nav";
import Footer from "../../../components/footer/footer";
import LegalPageHeader from "../../../components/legal/LegalPageHeader/LegalPageHeader";
import LegalSection from "../../../components/legal/LegalSection/LegalSection";
import LegalArticle from "../../../components/legal/LegalArticle/LegalArticle";
import SEO from "../../../components/shared/SEO";

function CookiesPage() {
    const {
        preferences,
        saved,
        handleToggle,
        handleSave,
        handleAcceptAll,
        handleRejectAll,
    } = useCookiesPage();

    return (
        <div className="cookies-page">
            <SEO
                title="Gestion des Cookies - Politique des Cookies"
                description="Gérez vos préférences en matière de cookies sur MAFRA. Découvrez les types de cookies utilisés et comment les gérer."
                keywords="cookies, politique des cookies, gestion des cookies, traceurs, consentement cookies"
                url="/cookies"
            />
            <Nav />
            <div className="cookies-container">
                <LegalPageHeader 
                    title="Gestion des Cookies"
                    lastUpdate="Janvier 2026"
                />

                <div className="cookies-content">
                    <LegalSection className="legal-intro">
                        <p>
                            Cette page vous permet de gérer vos préférences en matière de cookies. 
                            Vous pouvez à tout moment modifier vos choix en revenant sur cette page.
                        </p>
                    </LegalSection>

                    {saved && (
                        <div className="cookies-saved-message">
                            <i className="bi bi-check-circle-fill"></i>
                            Vos préférences ont été enregistrées avec succès
                        </div>
                    )}

                    <LegalArticle title="Qu'est-ce qu'un cookie ?">
                        <p>
                            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, 
                            smartphone, tablette) lors de la visite d'un site internet. Il permet au site 
                            de mémoriser des informations sur votre visite, comme votre langue préférée et 
                            d'autres paramètres, afin de faciliter votre prochaine visite et de rendre le 
                            site plus utile.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Les cookies que nous utilisons">
                        <div className="cookie-category">
                            <div className="cookie-category-header">
                                <div className="cookie-category-info">
                                    <h3>
                                        <i className="bi bi-shield-check"></i>
                                        Cookies Essentiels
                                    </h3>
                                    <span className="cookie-required">Toujours actifs</span>
                                </div>
                            </div>
                            <div className="cookie-category-content">
                                <p>
                                    Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas 
                                    être désactivés. Ils sont généralement établis en réponse à des actions 
                                    que vous effectuez et qui constituent une demande de services (connexion, 
                                    panier d'achat, préférences de confidentialité).
                                </p>
                                <div className="cookie-examples">
                                    <h4>Exemples de cookies essentiels :</h4>
                                    <ul>
                                        <li>
                                            <strong>token</strong> : Stocke votre jeton d'authentification 
                                            pour maintenir votre session connectée
                                        </li>
                                        <li>
                                            <strong>adminToken</strong> : Stocke le jeton d'authentification 
                                            pour les administrateurs
                                        </li>
                                        <li>
                                            <strong>cookie_consent</strong> : Mémorise vos préférences en 
                                            matière de cookies
                                        </li>
                                    </ul>
                                    <p className="cookie-duration">
                                        <strong>Durée de conservation :</strong> Session ou jusqu'à 30 jours
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="cookie-category">
                            <div className="cookie-category-header">
                                <div className="cookie-category-info">
                                    <h3>
                                        <i className="bi bi-graph-up"></i>
                                        Cookies Analytiques
                                    </h3>
                                    <span className="cookie-optional">Optionnels</span>
                                </div>
                                <label className="cookie-toggle">
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={() => handleToggle('analytics')}
                                    />
                                    <span className="cookie-toggle-slider"></span>
                                </label>
                            </div>
                            <div className="cookie-category-content">
                                <p>
                                    Ces cookies nous permettent de mesurer et d'analyser la façon dont vous 
                                    utilisez notre site afin d'améliorer ses performances et votre expérience. 
                                    Ils nous aident à savoir quelles pages sont les plus et les moins populaires 
                                    et à voir comment les visiteurs naviguent sur le site.
                                </p>
                                <div className="cookie-examples">
                                    <h4>Informations collectées :</h4>
                                    <ul>
                                        <li>Pages visitées et temps passé sur chaque page</li>
                                        <li>Parcours de navigation sur le site</li>
                                        <li>Source de trafic (comment vous êtes arrivé sur notre site)</li>
                                        <li>Appareil et navigateur utilisés</li>
                                    </ul>
                                    <p className="cookie-duration">
                                        <strong>Durée de conservation :</strong> Jusqu'à 13 mois
                                    </p>
                                    <p className="cookie-note">
                                        <i className="bi bi-info-circle"></i>
                                        Toutes les données collectées sont anonymisées et ne permettent pas 
                                        de vous identifier personnellement.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="cookie-category">
                            <div className="cookie-category-header">
                                <div className="cookie-category-info">
                                    <h3>
                                        <i className="bi bi-megaphone"></i>
                                        Cookies Marketing
                                    </h3>
                                    <span className="cookie-optional">Optionnels</span>
                                </div>
                                <label className="cookie-toggle">
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketing}
                                        onChange={() => handleToggle('marketing')}
                                    />
                                    <span className="cookie-toggle-slider"></span>
                                </label>
                            </div>
                            <div className="cookie-category-content">
                                <p>
                                    Ces cookies sont utilisés pour vous proposer des publicités pertinentes 
                                    et mesurer l'efficacité de nos campagnes publicitaires. Ils peuvent être 
                                    déposés par nos partenaires publicitaires via notre site.
                                </p>
                                <div className="cookie-examples">
                                    <h4>Utilisation :</h4>
                                    <ul>
                                        <li>Affichage de publicités personnalisées</li>
                                        <li>Mesure de l'efficacité des campagnes publicitaires</li>
                                        <li>Limitation du nombre de fois où vous voyez une publicité</li>
                                    </ul>
                                    <p className="cookie-duration">
                                        <strong>Durée de conservation :</strong> Jusqu'à 13 mois
                                    </p>
                                    <p className="cookie-note">
                                        <i className="bi bi-info-circle"></i>
                                        Actuellement, MAFRA n'utilise pas de cookies marketing. Cette 
                                        catégorie est prévue pour une utilisation future éventuelle.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </LegalArticle>

                    <LegalArticle title="Cookies tiers">
                        <p>
                            Certains cookies sont déposés par des services tiers auxquels nous faisons appel :
                        </p>
                        <ul>
                            <li>
                                <strong>Stripe :</strong> Notre prestataire de paiement utilise des cookies 
                                pour sécuriser les transactions et prévenir la fraude. Ces cookies sont 
                                essentiels au traitement des paiements.
                            </li>
                        </ul>
                    </LegalArticle>

                    <LegalArticle title="Comment gérer vos cookies ?">
                        <h3>Via notre site</h3>
                        <p>
                            Vous pouvez à tout moment modifier vos préférences en utilisant les boutons 
                            ci-dessous ou en revenant sur cette page.
                        </p>

                        <h3>Via votre navigateur</h3>
                        <p>
                            Vous pouvez également configurer votre navigateur pour accepter ou refuser les 
                            cookies. Voici les liens vers les pages d'aide des principaux navigateurs :
                        </p>
                        <ul>
                            <li>
                                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                                    Google Chrome
                                </a>
                            </li>
                            <li>
                                <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer">
                                    Mozilla Firefox
                                </a>
                            </li>
                            <li>
                                <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
                                    Safari
                                </a>
                            </li>
                            <li>
                                <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">
                                    Microsoft Edge
                                </a>
                            </li>
                        </ul>
                        <p className="cookie-warning">
                            <i className="bi bi-exclamation-triangle"></i>
                            Attention : Le blocage de certains cookies peut affecter votre expérience sur 
                            notre site et limiter l'accès à certaines fonctionnalités (connexion, panier, etc.).
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Durée de conservation">
                        <p>
                            Conformément aux recommandations de la CNIL, la durée de conservation maximale 
                            des cookies est de 13 mois à compter de leur premier dépôt sur votre terminal.
                        </p>
                        <p>
                            Votre consentement aux cookies est également conservé pour une durée de 13 mois. 
                            À l'issue de ce délai, votre consentement vous sera à nouveau demandé.
                        </p>
                    </LegalArticle>

                    <LegalArticle title="Plus d'informations">
                        <p>
                            Pour plus d'informations sur les cookies et la protection de votre vie privée, 
                            vous pouvez consulter :
                        </p>
                        <ul>
                            <li>
                                Notre <a href="/privacy">Politique de Confidentialité</a>
                            </li>
                            <li>
                                Le site de la CNIL : <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer">
                                    www.cnil.fr/fr/cookies-et-autres-traceurs
                                </a>
                            </li>
                        </ul>
                    </LegalArticle>

                    <section className="cookies-actions">
                        <h2>Gérer mes préférences</h2>
                        <p>
                            Choisissez les cookies que vous souhaitez autoriser :
                        </p>
                        <div className="cookies-buttons">
                            <button onClick={handleAcceptAll} className="cookies-btn accept-all">
                                <i className="bi bi-check-circle"></i>
                                Tout accepter
                            </button>
                            <button onClick={handleSave} className="cookies-btn save">
                                <i className="bi bi-save"></i>
                                Enregistrer mes choix
                            </button>
                            <button onClick={handleRejectAll} className="cookies-btn reject-all">
                                <i className="bi bi-x-circle"></i>
                                Tout refuser
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CookiesPage;
