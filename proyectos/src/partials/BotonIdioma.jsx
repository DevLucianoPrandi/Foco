import React from "react";
import Deutsch from "../assets/img/alemania.png";
import { useIdioma } from "../idioma/IdiomaContext";

function BanderaArgentina({ tamano }) {
    return (
        <svg width={tamano} height={tamano} viewBox="0 0 28 28" aria-hidden="true">
            <rect y="5" width="28" height="6" fill="#74acdf" />
            <rect y="11" width="28" height="6" fill="#ffffff" />
            <rect y="17" width="28" height="6" fill="#74acdf" />
            <circle cx="14" cy="14" r="2" fill="#f6b40e" />
            <rect x="0.5" y="5.5" width="27" height="17" fill="none" stroke="#b0b0b0" />
        </svg>
    );
}

function BotonIdioma({ className, tamano, lado = "izquierda" }) {
    const { idioma, alternarIdioma } = useIdioma();
    const enAleman = idioma === "de";
    const etiqueta = enAleman ? "Español" : "Deutsch";
    const margen = lado === "izquierda" ? { marginRight: "0.5rem" } : { marginLeft: "0.5rem" };

    const bandera = enAleman
        ? <span style={{ display: "inline-block", verticalAlign: "middle", ...margen }}><BanderaArgentina tamano={tamano} /></span>
        : <img src={Deutsch} alt="" style={{ ...margen, width: `${tamano}px`, height: `${tamano}px` }} />;

    return (
        <button type="button" className={`botonIdioma ${className}`} onClick={alternarIdioma} lang={enAleman ? "es" : "de"}>
            {lado === "izquierda" && bandera}
            {etiqueta}
            {lado === "derecha" && bandera}
        </button>
    );
}

export { BotonIdioma };
