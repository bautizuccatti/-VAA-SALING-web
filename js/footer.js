/* =========================
   FOOTER
========================= */

function initFooter() {

    initFooterYear();

    initFooterReveal();

    initFooterBackToTop();

}


/* =========================
   AÑO AUTOMÁTICO
========================= */

function initFooterYear() {

    const footerYear = document.getElementById("footerYear");

    if (!footerYear) {
        return;
    }

    footerYear.textContent = new Date().getFullYear();

}


/* =========================
   REVEAL
========================= */

function initFooterReveal() {

    const elements = document.querySelectorAll(".footer-reveal");

    if (!elements.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries, footerObserver) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "footer-reveal--visible"
                );

                footerObserver.unobserve(entry.target);

            });

        },
        {
            threshold: 0.15
        }
    );

    elements.forEach((element, index) => {

        element.style.transitionDelay =
            `${Math.min(index * 90, 360)}ms`;

        observer.observe(element);

    });

}


/* =========================
   VOLVER ARRIBA
========================= */

function initFooterBackToTop() {

    const backToTopButton =
        document.querySelector(".footer__back-to-top");

    if (!backToTopButton) {
        return;
    }

    backToTopButton.addEventListener("click", (event) => {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}