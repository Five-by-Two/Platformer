import App from './src/App';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

export function render() {
    console.log('render APP:', <App />);
    return ReactDOMServer.renderToString(<App />);
}
