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

    const text = heroTitle.dataset.text;

    heroTitle.textContent = "";

    let currentLetter = 0;

    function writeLetter() {

        if (currentLetter >= text.length) {
            return;
        }

        heroTitle.textContent += text[currentLetter];

        currentLetter++;

        setTimeout(writeLetter, 35);

    }

    setTimeout(writeLetter, 500);

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