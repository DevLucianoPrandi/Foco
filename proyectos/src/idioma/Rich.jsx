import { Fragment } from 'react';

// Muestra en negrita el texto encerrado entre ** **
export function Rich({ children }) {
    return String(children)
        .split('**')
        .map((parte, i) => (i % 2 === 1 ? <strong key={i}>{parte}</strong> : <Fragment key={i}>{parte}</Fragment>));
}
