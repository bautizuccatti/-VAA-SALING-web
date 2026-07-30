/* =========================
   PRÓXIMAS TRAVESÍAS
========================= */

const journeysData = [

    /* =========================
       01 · ISLAS CANARIAS
    ========================= */

    {
        meta: "SEP 05 · 15 · 2026",

        location:
            "GRAN CANARIA · TENERIFE · LA GOMERA · LA PALMA",

        title:
            "ISLAS CANARIAS",

        description:
            "Diez días explorando el archipiélago canario a bordo del NDS Zero. Volcanes, aguas profundas y navegación oceánica real.",

        price:
            "USD 2.400 POR PERSONA",

        availability:
            "4 LUGARES DISPONIBLES",

        duration:
            "10 DÍAS",

        detailsText:
            "DESCUBRIR VIAJE",

        detailsLink:
            "#islas-canarias",

        whatsappLink:
            "https://wa.me/5490000000000?text=Hola%2C%20quiero%20consultar%20por%20la%20traves%C3%ADa%20a%20Islas%20Canarias."
    },


    /* =========================
       02 · COSTA ESPAÑOLA
    ========================= */

    {
        meta:
            "SEP 20 · 26 · 2026",

        location:
            "CÁDIZ · TARIFA · MÁLAGA · ALMERÍA",

        title:
            "COSTA ESPAÑOLA",

        description:
            "Siete días navegando por la costa española entre pequeñas bahías, pueblos marítimos y fondeos escondidos. Una travesía cercana, tranquila y auténtica.",

        price:
            "USD 1.650 POR PERSONA",

        availability:
            "3 LUGARES DISPONIBLES",

        duration:
            "7 DÍAS",

        detailsText:
            "DESCUBRIR VIAJE",

        detailsLink:
            "#costa-espanola",

        whatsappLink:
            "https://wa.me/5490000000000?text=Hola%2C%20quiero%20consultar%20por%20la%20traves%C3%ADa%20por%20la%20Costa%20Espa%C3%B1ola."
    },


    /* =========================
       03 · CRUCE ATLÁNTICO
    ========================= */

    {
        meta:
            "NOV 20 · DIC 14 · 2026",

        location:
            "ISLAS CANARIAS · CABO VERDE · CARIBE",

        title:
            "CRUCE ATLÁNTICO",

        description:
            "Veinticuatro días para vivir el océano en su forma más profunda. Navegación de larga distancia, guardias, aprendizaje y semanas sin tierra a la vista.",

        price:
            "EXPERIENCIA OCEÁNICA",

        availability:
            "TRAVESÍA COMPLETA",

        duration:
            "24 DÍAS",

        detailsText:
            "CONOCER LA EXPERIENCIA",

        detailsLink:
            "#cruce-atlantico",

        whatsappLink:
            "https://wa.me/5490000000000?text=Hola%2C%20quiero%20recibir%20informaci%C3%B3n%20sobre%20futuros%20cruces%20del%20Atl%C3%A1ntico."
    }

];


/* =========================
   INICIALIZACIÓN
========================= */

function initJourneys() {

    const journeysSection = document.querySelector(".journeys");

    if (!journeysSection) {
        return;
    }


    const cards = [
        ...journeysSection.querySelectorAll("[data-journey-card]")
    ];


    const backgrounds = [
        ...journeysSection.querySelectorAll(
            "[data-journey-background]"
        )
    ];


    const information = journeysSection.querySelector(
        ".journeys__information"
    );


    const elements = {

        meta:
            journeysSection.querySelector(
                "[data-journey-meta]"
            ),

        location:
            journeysSection.querySelector(
                "[data-journey-location]"
            ),

        title:
            journeysSection.querySelector(
                "[data-journey-title]"
            ),

        description:
            journeysSection.querySelector(
                "[data-journey-description]"
            ),

        price:
            journeysSection.querySelector(
                "[data-journey-price]"
            ),

        availability:
            journeysSection.querySelector(
                "[data-journey-availability]"
            ),

        duration:
            journeysSection.querySelector(
                "[data-journey-duration]"
            ),

        detailsLink:
            journeysSection.querySelector(
                "[data-journey-link]"
            ),

        whatsappLink:
            journeysSection.querySelector(
                "[data-journey-whatsapp]"
            )

    };


    let currentJourneyIndex = 0;


    /* =========================
       CAMBIAR TRAVESÍA
    ========================= */

    function updateJourney(index) {

        const journey = journeysData[index];

        if (!journey || index === currentJourneyIndex) {
            return;
        }


        currentJourneyIndex = index;


        information.classList.add(
            "journeys__information--changing"
        );


        window.setTimeout(() => {

            elements.meta.textContent =
                journey.meta;

            elements.location.textContent =
                journey.location;

            elements.title.textContent =
                journey.title;

            elements.description.textContent =
                journey.description;

            elements.price.textContent =
                journey.price;

            elements.availability.textContent =
                journey.availability;

            elements.duration.textContent =
                journey.duration;

            elements.detailsLink.textContent =
                journey.detailsText;

            elements.detailsLink.href =
                journey.detailsLink;

            elements.whatsappLink.href =
                journey.whatsappLink;


            /* Card activa */

            cards.forEach((card, cardIndex) => {

                card.classList.toggle(
                    "journey-card--active",
                    cardIndex === index
                );

                card.setAttribute(
                    "aria-selected",
                    cardIndex === index
                        ? "true"
                        : "false"
                );

            });


            /* Fondo activo */

            backgrounds.forEach(
                (background, backgroundIndex) => {

                    background.classList.toggle(
                        "journeys__background--active",
                        backgroundIndex === index
                    );

                }
            );


            information.classList.remove(
                "journeys__information--changing"
            );

        }, 250);

    }


    /* =========================
       EVENTOS DE LAS CARDS
    ========================= */

    cards.forEach((card, index) => {

        card.addEventListener("click", () => {

            const isMobile = window.matchMedia(
                "(max-width: 700px)"
            ).matches;


            if (isMobile) {

                const isExpanded =
                    card.classList.contains(
                        "journey-card--expanded"
                    );


                cards.forEach((currentCard) => {

                    currentCard.classList.remove(
                        "journey-card--expanded"
                    );

                });


                if (!isExpanded) {

                    card.classList.add(
                        "journey-card--expanded"
                    );

                }

            }


            updateJourney(index);

        });


        card.addEventListener("keydown", (event) => {

            const validKey =
                event.key === "Enter" ||
                event.key === " ";


            if (!validKey) {
                return;
            }


            event.preventDefault();

            updateJourney(index);

        });

    });


    /* =========================
       ESTADO INICIAL
    ========================= */

    currentJourneyIndex = -1;

    updateJourney(0);

}