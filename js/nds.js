/* =========================
   NDS ZERO
========================= */

function initNdsZero() {

    const section = document.querySelector(".nds-zero");

    if (!section) return;

    initNdsReveal(section);
    initNdsCounters(section);
    initNdsBackgroundMovement(section);

}


/* =========================
   ANIMACIONES REVEAL
========================= */

function initNdsReveal(section) {

    const elements = section.querySelectorAll(".nds-reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries, revealObserver) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("nds-reveal--visible");

                revealObserver.unobserve(entry.target);

            });

        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach((element) => {
        observer.observe(element);
    });


    const sectionObserver = new IntersectionObserver(
        (entries, waveObserver) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                section.classList.add("nds-zero--visible");

                waveObserver.unobserve(section);

            });

        },
        {
            threshold: 0.15
        }
    );

    sectionObserver.observe(section);

}


/* =========================
   CONTADORES
========================= */

function initNdsCounters(section) {

    const counters = section.querySelectorAll(".nds-counter");

    if (!counters.length) return;

    let countersStarted = false;

    const observer = new IntersectionObserver(
        (entries, counterObserver) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting || countersStarted) return;

                countersStarted = true;

                counters.forEach((counter) => {
                    animateNdsCounter(counter);
                });

                counterObserver.disconnect();

            });

        },
        {
            threshold: 0.35
        }
    );

    const specifications = section.querySelector(
        ".nds-zero__specifications"
    );

    if (specifications) {
        observer.observe(specifications);
    }

}


function animateNdsCounter(counter) {

    const target = Number(counter.dataset.target);
    const decimals = Number(counter.dataset.decimals || 0);

    const duration = 1600;
    const startTime = performance.now();

    function updateCounter(currentTime) {

        const elapsedTime = currentTime - startTime;

        const progress = Math.min(elapsedTime / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 3);

        const currentValue = target * easedProgress;

        counter.textContent = formatNdsNumber(
            currentValue,
            decimals
        );

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }

    }

    requestAnimationFrame(updateCounter);

}


function formatNdsNumber(value, decimals) {

    return value.toLocaleString("es-AR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });

}


/* =========================
   MOVIMIENTO SUAVE DEL FONDO
========================= */

function initNdsBackgroundMovement(section) {

    const background = section.querySelector(
        ".nds-zero__background"
    );

    if (!background) return;

    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerWidth <= 768
    ) {
        return;
    }

    let ticking = false;

    function updateBackgroundPosition() {

        const sectionRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (
            sectionRect.bottom < 0 ||
            sectionRect.top > windowHeight
        ) {
            ticking = false;
            return;
        }

        const progress =
            (windowHeight - sectionRect.top) /
            (windowHeight + sectionRect.height);

        const movement = (progress - 0.5) * 28;

        background.style.transform =
            `scale(1.06) translateY(${movement}px)`;

        ticking = false;

    }

    function handleScroll() {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(updateBackgroundPosition);

    }

    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );

    updateBackgroundPosition();

}


/* =========================
   INICIALIZACIÓN
========================= */

document.addEventListener("DOMContentLoaded", initNdsZero);