import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { de } from './de';

const IdiomaContext = createContext({ idioma: 'es', alternarIdioma: () => {}, tr: (texto) => texto });

const leerIdiomaGuardado = () => {
    const enUrl = new URLSearchParams(window.location.search).get('idioma');
    if (enUrl === 'de' || enUrl === 'es') return enUrl;
    try {
        return localStorage.getItem('idioma') === 'de' ? 'de' : 'es';
    } catch {
        return 'es';
    }
};

export function IdiomaProvider({ children }) {
    const [idioma, setIdioma] = useState(leerIdiomaGuardado);

    useEffect(() => {
        document.documentElement.lang = idioma;
        try {
            localStorage.setItem('idioma', idioma);
        } catch {
            // sin almacenamiento disponible: el idioma solo dura mientras la pestaña esté abierta
        }
    }, [idioma]);

    const alternarIdioma = useCallback(() => {
        setIdioma((actual) => (actual === 'es' ? 'de' : 'es'));
    }, []);

    const tr = useCallback(
        (texto) => (idioma === 'de' && de[texto] !== undefined ? de[texto] : texto),
        [idioma]
    );

    const valor = useMemo(() => ({ idioma, alternarIdioma, tr }), [idioma, alternarIdioma, tr]);

    return <IdiomaContext.Provider value={valor}>{children}</IdiomaContext.Provider>;
}

export const useIdioma = () => useContext(IdiomaContext);
