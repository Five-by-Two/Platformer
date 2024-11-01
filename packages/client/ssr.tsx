import App from './src/App';
import { renderToString } from 'react-dom/server';

export function render() {
    return renderToString(<App />);
}
