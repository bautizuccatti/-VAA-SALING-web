/* =========================
   MÁQUINA DE ESCRIBIR
========================= */

const heroTitle = document.querySelector(".hero__title");

function typeWriter(element) {
    const text = element.dataset.text;

    let currentLetter = 0;

    function writeLetter() {
        if (currentLetter < text.length) {
            element.textContent += text[currentLetter];

            currentLetter++;

            setTimeout(writeLetter, 35);
        }
    }

    writeLetter();
}

if (heroTitle) {
    setTimeout(() => {
        typeWriter(heroTitle);
    }, 500);
}


/* =========================
   RECTÁNGULO AL HACER SCROLL
========================= */

const hero = document.querySelector(".hero");
const heroTitleBox = document.querySelector(".hero__title-box");

function animateHeroOnScroll() {
    if (!hero || !heroTitleBox) {
        return;
    }

    const heroHeight = hero.offsetHeight;
    const scrollPosition = window.scrollY;

    const progress = Math.min(scrollPosition / heroHeight, 1);

    const boxScale = 1 - progress * 0.75;

    heroTitleBox.style.setProperty(
        "--box-scale",
        boxScale
    );
}

window.addEventListener("scroll", animateHeroOnScroll);

animateHeroOnScroll();