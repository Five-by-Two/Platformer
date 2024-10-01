import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Provider store={store}>
                    <Router />
                </Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
