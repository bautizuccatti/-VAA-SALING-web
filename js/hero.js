/* =========================
   HERO
========================= */

function initHero() {
    initTypeWriter();
    initHeroScroll();
}


/* =========================
   MÁQUINA DE ESCRIBIR
========================= */

function initTypeWriter() {
    const heroTitle = document.querySelector(".hero__title");

    if (!heroTitle) {
        return;
    }

    let typingTimeout;
    let animationVersion = 0;

    function startTypeWriter(delay = 500) {
        /*
         * Cada vez que se reinicia la animación,
         * aumenta la versión para cancelar la anterior.
         */
        animationVersion++;

        const currentVersion = animationVersion;
        const text = heroTitle.dataset.text || "";

        clearTimeout(typingTimeout);

        heroTitle.textContent = "";

        let currentLetter = 0;

        function writeLetter() {
            /*
             * Si comenzó una animación nueva,
             * la anterior deja de escribir.
             */
            if (currentVersion !== animationVersion) {
                return;
            }

            if (currentLetter >= text.length) {
                return;
            }

            heroTitle.textContent += text[currentLetter];
            currentLetter++;

            typingTimeout = setTimeout(writeLetter, 35);
        }

        typingTimeout = setTimeout(writeLetter, delay);
    }

    // Primera animación al cargar la página
    startTypeWriter();

    // Reinicia la consola al cambiar el idioma
    document.addEventListener("languageChanged", () => {
        startTypeWriter(100);
    });
}


/* =========================
   HERO SCROLL
========================= */

function initHeroScroll() {
    const hero = document.querySelector(".hero");
    const heroTitleBox = document.querySelector(".hero__title-box");

    if (!hero || !heroTitleBox) {
        return;
    }

    function updateHeroOnScroll() {
        const heroHeight = hero.offsetHeight;

        const progress = Math.min(
            window.scrollY / heroHeight,
            1
        );

        const boxScale = 1 - progress * 0.75;

        heroTitleBox.style.setProperty(
            "--box-scale",
            boxScale
        );
    }

    window.addEventListener(
        "scroll",
        updateHeroOnScroll
    );

    updateHeroOnScroll();
}