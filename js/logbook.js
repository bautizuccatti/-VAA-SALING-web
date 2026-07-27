/* =========================
   BITÁCORA / CARRUSEL
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".logbook__slider");

    if (!slider) {
        return;
    }


    /* Elementos */

    const slides = Array.from(
        slider.querySelectorAll(".logbook__slide")
    );

    const progressLines = Array.from(
        slider.querySelectorAll(".logbook__progress-line")
    );

    const previousButton = slider.querySelector("#logbook-prev");
    const nextButton = slider.querySelector("#logbook-next");

    const currentCounter = slider.querySelector("#logbook-current");
    const totalCounter = slider.querySelector("#logbook-total");

    const locationElement = slider.querySelector("#logbook-location");
    const dateElement = slider.querySelector("#logbook-date");
    const positionElement = slider.querySelector("#logbook-position");
    const titleElement = slider.querySelector("#logbook-title");
    const descriptionElement = slider.querySelector(
        "#logbook-description"
    );


    /* Configuración */

    let currentSlideIndex = 0;
    let isAnimating = false;
    let automaticInterval = null;

    const automaticTime = 9000;

    const typeSpeed = {
        location: 35,
        date: 28,
        position: 22,
        title: 55,
        description: 18
    };


    /* Utilidades */

    function formatNumber(number) {
        return String(number).padStart(2, "0");
    }


    function wait(milliseconds) {
        return new Promise(resolve => {
            window.setTimeout(resolve, milliseconds);
        });
    }


    /* Efecto de escritura */

    function typeText(element, text, speed) {

        return new Promise(resolve => {

            if (!element) {
                resolve();
                return;
            }

            element.textContent = "";
            element.classList.remove("is-complete");

            let characterIndex = 0;

            const typingInterval = window.setInterval(() => {

                element.textContent += text.charAt(characterIndex);
                characterIndex += 1;

                if (characterIndex >= text.length) {

                    window.clearInterval(typingInterval);

                    element.classList.add("is-complete");

                    resolve();
                }

            }, speed);

        });
    }


    function clearTexts() {

        const textElements = [
            locationElement,
            dateElement,
            positionElement,
            titleElement,
            descriptionElement
        ];

        textElements.forEach(element => {

            if (!element) {
                return;
            }

            element.textContent = "";
            element.classList.remove("is-complete");

        });
    }


    async function writeSlideInformation(slide) {

        const {
            location,
            date,
            position,
            title,
            description
        } = slide.dataset;

        clearTexts();

        await wait(250);

        await typeText(
            locationElement,
            location || "",
            typeSpeed.location
        );

        await wait(80);

        await typeText(
            dateElement,
            date || "",
            typeSpeed.date
        );

        await typeText(
            positionElement,
            position || "",
            typeSpeed.position
        );

        await wait(130);

        await typeText(
            titleElement,
            title || "",
            typeSpeed.title
        );

        await wait(100);

        await typeText(
            descriptionElement,
            description || "",
            typeSpeed.description
        );

    }


    /* Cambiar diapositiva */

    async function showSlide(newIndex) {

        if (isAnimating || newIndex === currentSlideIndex) {
            return;
        }

        isAnimating = true;

        slides[currentSlideIndex].classList.remove("is-active");

        progressLines[currentSlideIndex]?.classList.remove("is-active");

        currentSlideIndex = newIndex;

        slides[currentSlideIndex].classList.add("is-active");

        progressLines[currentSlideIndex]?.classList.add("is-active");

        currentCounter.textContent = formatNumber(
            currentSlideIndex + 1
        );

        await writeSlideInformation(
            slides[currentSlideIndex]
        );

        isAnimating = false;

    }


    function showNextSlide() {

        const nextIndex =
            (currentSlideIndex + 1) % slides.length;

        showSlide(nextIndex);

    }


    function showPreviousSlide() {

        const previousIndex =
            (currentSlideIndex - 1 + slides.length) %
            slides.length;

        showSlide(previousIndex);

    }


    /* Cambio automático */

    function startAutomaticSlider() {

        stopAutomaticSlider();

        automaticInterval = window.setInterval(() => {
            showNextSlide();
        }, automaticTime);

    }


    function stopAutomaticSlider() {

        if (!automaticInterval) {
            return;
        }

        window.clearInterval(automaticInterval);

        automaticInterval = null;

    }


    function restartAutomaticSlider() {

        stopAutomaticSlider();
        startAutomaticSlider();

    }


    /* Botones */

    nextButton?.addEventListener("click", () => {
        showNextSlide();
        restartAutomaticSlider();
    });


    previousButton?.addEventListener("click", () => {
        showPreviousSlide();
        restartAutomaticSlider();
    });


    /* Teclado */

    slider.addEventListener("keydown", event => {

        if (event.key === "ArrowRight") {
            showNextSlide();
            restartAutomaticSlider();
        }

        if (event.key === "ArrowLeft") {
            showPreviousSlide();
            restartAutomaticSlider();
        }

    });


    /* Pausar al colocar el mouse */

    slider.addEventListener("mouseenter", stopAutomaticSlider);

    slider.addEventListener("mouseleave", startAutomaticSlider);


    /* Gestos táctiles */

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener(
        "touchstart",
        event => {

            touchStartX = event.changedTouches[0].clientX;

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        event => {

            touchEndX = event.changedTouches[0].clientX;

            const swipeDistance = touchStartX - touchEndX;
            const minimumSwipeDistance = 50;

            if (swipeDistance > minimumSwipeDistance) {
                showNextSlide();
                restartAutomaticSlider();
            }

            if (swipeDistance < -minimumSwipeDistance) {
                showPreviousSlide();
                restartAutomaticSlider();
            }

        },
        {
            passive: true
        }
    );


    /* Inicio */

    totalCounter.textContent = formatNumber(slides.length);

    currentCounter.textContent = formatNumber(
        currentSlideIndex + 1
    );

    progressLines[currentSlideIndex]?.classList.add(
        "is-active"
    );

    writeSlideInformation(slides[currentSlideIndex]);

    startAutomaticSlider();

});