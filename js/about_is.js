/* =========================
   ABOUT
========================= */

function initAbout() {

    revealAboutSection();

}


/* =========================
   ABOUT REVEAL
========================= */

function revealAboutSection() {

    const aboutSection = document.querySelector(".about");

    if (!aboutSection) {
        return;
    }

    const observer = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.2,
            rootMargin: "0px 0px -80px 0px"
        }

    );

    observer.observe(aboutSection);

}