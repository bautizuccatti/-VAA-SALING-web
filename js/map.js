/* =========================
   MAPA VA'A SAILING
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const mapElement = document.querySelector("#sailingMap");

    if (!mapElement) {
        return;
    }


    /* =========================
       EDITAR SOLO ESTOS DATOS
    ========================= */

    const sailingData = {

        currentPosition: {
            latitude: 40.000,
            longitude: 20.7069
        },

        lastUpdate: "29 de julio de 2026",

        zoom: 8,

        /*
         * Ruta recorrida.
         *
         * Cada posición se escribe así:
         * [latitud, longitud]
         *
         * La última posición debería coincidir
         * con currentPosition.
         */

        route: [
            [38.2466, 21.7346],
            [38.6780, 20.8600],
            [38.8339, 20.7069]
        ]
    };


    /* =========================
       VALIDACIONES
    ========================= */

    const {
        latitude,
        longitude
    } = sailingData.currentPosition;

    const validCoordinates =
        Number.isFinite(latitude) &&
        Number.isFinite(longitude) &&
        latitude >= -90 &&
        latitude <= 90 &&
        longitude >= -180 &&
        longitude <= 180;

    if (!validCoordinates) {
        console.error(
            "Las coordenadas del barco no son válidas."
        );

        mapElement.innerHTML = `
            <p style="
                padding: 30px;
                color: #f4f1e8;
                font-family: sans-serif;
            ">
                No se pudo cargar la posición del barco.
            </p>
        `;

        return;
    }


    /* =========================
       CREAR MAPA
    ========================= */

    const boatPosition = [
    latitude,
    longitude
];

const map = L.map("sailingMap", {
    center: boatPosition,
    zoom: sailingData.zoom,

    zoomControl: true,
    attributionControl: true,
    scrollWheelZoom: false,

    minZoom: 3,

    maxBounds: [
        [-85, -180],
        [85, 180]
    ],

    maxBoundsViscosity: 1.0
});

    /* =========================
       CAPA OSCURA
    ========================= */

    L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
        subdomains: "abcd",
        maxZoom: 20,
        noWrap: true,

        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }
).addTo(map);


    /* =========================
       ÍCONO DEL BARCO
    ========================= */

    const boatIcon = L.divIcon({
        className: "boat-marker-wrapper",

        html: `
            <div class="boat-marker">
                <span
                    class="boat-marker__icon"
                    aria-hidden="true"
                >
                    <span class="boat-marker__mast"></span>

                    <span class="boat-marker__sail"></span>

                    <span
                        class="
                            boat-marker__sail
                            boat-marker__sail--small
                        "
                    ></span>

                    <span class="boat-marker__hull"></span>
                </span>
            </div>
        `,

        iconSize: [58, 58],
        iconAnchor: [29, 29],
        popupAnchor: [0, -34]
    });


    /* =========================
       MARCADOR
    ========================= */

    const boatMarker = L.marker(
        boatPosition,
        {
            icon: boatIcon,
            title: "Posición actual de VA'A Sailing"
        }
    ).addTo(map);


    boatMarker.bindPopup(`
        <div class="boat-popup">

            <span class="boat-popup__eyebrow">
                Posición actual
            </span>

            <p class="boat-popup__title">
                VA'A Sailing
            </p>

            <p class="boat-popup__text">
                Última actualización:<br>
                ${sailingData.lastUpdate}
            </p>

        </div>
    `);


    /* =========================
       RUTA
    ========================= */

    const validRoute = sailingData.route.filter((position) => {

        if (!Array.isArray(position) || position.length !== 2) {
            return false;
        }

        const [routeLatitude, routeLongitude] = position;

        return (
            Number.isFinite(routeLatitude) &&
            Number.isFinite(routeLongitude) &&
            routeLatitude >= -90 &&
            routeLatitude <= 90 &&
            routeLongitude >= -180 &&
            routeLongitude <= 180
        );
    });


    /* =========================
       DATOS INFERIORES
    ========================= */

    const coordinatesElement =
        document.querySelector("#boatCoordinates");

    const lastUpdateElement =
        document.querySelector("#boatLastUpdate");


    if (coordinatesElement) {

        const latitudeDirection =
            latitude >= 0 ? "N" : "S";

        const longitudeDirection =
            longitude >= 0 ? "E" : "O";

        coordinatesElement.textContent =
            `${Math.abs(latitude).toFixed(4)}° ${latitudeDirection} · ` +
            `${Math.abs(longitude).toFixed(4)}° ${longitudeDirection}`;
    }


    if (lastUpdateElement) {
        lastUpdateElement.textContent =
            sailingData.lastUpdate;
    }


    /* =========================
       BOTÓN CENTRAR
    ========================= */

    const centerButton =
        document.querySelector("#centerBoatButton");

    if (centerButton) {

        centerButton.addEventListener("click", () => {

            map.flyTo(
                boatPosition,
                sailingData.zoom,
                {
                    animate: true,
                    duration: 1.4
                }
            );

            window.setTimeout(() => {
                boatMarker.openPopup();
            }, 900);
        });
    }


    /* =========================
       COMPORTAMIENTO
    ========================= */

    map.on("click", () => {
        map.scrollWheelZoom.enable();
    });

    map.on("mouseout", () => {
        map.scrollWheelZoom.disable();
    });


    /*
     * Corrige el tamaño cuando el mapa entra
     * con animaciones reveal.
     */

    window.setTimeout(() => {
        map.invalidateSize();
    }, 500);

});