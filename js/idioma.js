const translations = {
    es: {
        // HEADER
        "menu.about": "Nosotros",
        "menu.episodes": "Episodios",
        "menu.live": "En vivo",
        "menu.nds": "NDS Zero",
        "menu.support": "Colaborar",

        // HERO
        "hero.status": "● EN LÍNEA",

        "hero.console": `VA'A SAILING

Inicializando bitácora...

> Bienvenidos a la vida a bordo.
> Documentando travesías.
> Explorando culturas.
> Protegiendo el océano.

Sistema listo.`,

        "hero.slogan":
            "El océano como guía, la sostenibilidad y el bienestar como destino",

        "hero.description":
            "Documentando la realidad de vivir, navegar y explorar de forma sustentable",

        "hero.episodes": "Ver episodios",
        "hero.sailWithUs": "Navegá con nosotros",
        "hero.scroll": "Scroll",

        // ABOUT
        "about.eyebrow": "Nuestra historia. Nuestro propósito",
        "about.title": "¿Qué es todo esto?",

        "about.card1.title": "Quiénes somos",
        "about.card1.text":
            "Somos Lucía y Simón, una pareja que eligió construir su vida alrededor del mar.",

        "about.card2.title": "Cómo nace<br>VA'A Sailing",
        "about.card2.text":
            "Nace en 2017, de una incomodidad. De ver de cerca la contaminación y las contradicciones de la industria náutica.",

        "about.card3.title": "Qué vamos<br>a hacer",
        "about.card3.text":
            "En 2026 comenzamos una expedición: dar la vuelta al mundo a bordo del NDS Zero.",

        "about.card4.title": "Por qué<br>lo hacemos",
        "about.card4.text":
            "Porque creemos que el océano no es infinito y sentimos la responsabilidad de actuar.",

        // SUSTAINABILITY
        "sustainability.label": "NDS · NEED DEVELOPS SKILLS",
        "sustainability.title":
            "“DEVOLVERLE AL MAR TODO LO QUE NOS DA.”",
        "sustainability.subtitle":
            "La sustentabilidad es un hábito.",
        "sustainability.description1":
            "No existe la sustentabilidad al 100%, pero podemos hacer grandes cambios.",
        "sustainability.description2":
            "Cualquiera puede navegar. Se puede vivir con menos."
    },

    en: {
        // HEADER
        "menu.about": "About",
        "menu.episodes": "Episodes",
        "menu.live": "Live",
        "menu.nds": "NDS Zero",
        "menu.support": "Get Involved",

        // HERO
        "hero.status": "● ONLINE",

        "hero.console": `VA'A SAILING

Initializing logbook...

> Welcome to life on board.
> Documenting our journeys.
> Exploring cultures.
> Protecting the ocean.

System ready.`,

        "hero.slogan":
            "The ocean as our guide, with sustainability and well-being as our destination",

        "hero.description":
            "Documenting the reality of living, sailing and exploring sustainably",

        "hero.episodes": "Watch episodes",
        "hero.sailWithUs": "Sail with us",
        "hero.scroll": "Scroll",

        // ABOUT
        "about.eyebrow": "Our story. Our purpose",
        "about.title": "What is all this about?",

        "about.card1.title": "Who we are",
        "about.card1.text":
            "We are Lucía and Simón, a couple who chose to build their lives around the sea.",

        "about.card2.title": "How VA'A Sailing<br>began",
        "about.card2.text":
            "It began in 2017 from a feeling of discomfort after seeing firsthand the pollution and contradictions within the sailing industry.",

        "about.card3.title": "What we are<br>going to do",
        "about.card3.text":
            "In 2026, we begin an expedition: sailing around the world aboard NDS Zero.",

        "about.card4.title": "Why we<br>do it",
        "about.card4.text":
            "Because we believe the ocean is not infinite, and we feel responsible for taking action.",

        // SUSTAINABILITY
        "sustainability.label": "NDS · NEED DEVELOPS SKILLS",
        "sustainability.title":
            "“GIVE BACK TO THE OCEAN ALL THAT IT GIVES US.”",
        "sustainability.subtitle":
            "Sustainability is a habit.",
        "sustainability.description1":
            "There is no such thing as 100% sustainability, but we can make meaningful changes.",
        "sustainability.description2":
            "Anyone can sail. We can live with less."
    }
};


function changeLanguage(language) {
    const selectedTranslations = translations[language];

    if (!selectedTranslations) {
        return;
    }

    // Traduce textos normales
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.dataset.i18n;
        const translatedText = selectedTranslations[key];

        if (translatedText !== undefined) {
            element.textContent = translatedText;
        }
    });

    // Traduce textos que contienen HTML, por ejemplo <br>
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
        const key = element.dataset.i18nHtml;
        const translatedText = selectedTranslations[key];

        if (translatedText !== undefined) {
            element.innerHTML = translatedText;
        }
    });

    // Traduce atributos, por ejemplo data-text del Hero
    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
        const key = element.dataset.i18nKey;
        const attribute = element.dataset.i18nAttr;
        const translatedText = selectedTranslations[key];

        if (translatedText !== undefined && attribute) {
            element.setAttribute(attribute, translatedText);
        }
    });

    document.documentElement.lang = language;

    document.querySelectorAll("[data-language]").forEach((button) => {
        button.classList.toggle(
            "language-button--active",
            button.dataset.language === language
        );
    });

    localStorage.setItem("vaa-language", language);

    document.dispatchEvent(
        new CustomEvent("languageChanged", {
            detail: {
                language
            }
        })
    );
}


document.addEventListener("DOMContentLoaded", () => {
    const languageButtons =
        document.querySelectorAll("[data-language]");

    languageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            changeLanguage(button.dataset.language);
        });
    });

    const savedLanguage =
        localStorage.getItem("vaa-language") || "es";

    changeLanguage(savedLanguage);
});