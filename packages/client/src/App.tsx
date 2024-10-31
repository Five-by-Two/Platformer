import './App.css';
import Routes from './router';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Routes />
            </Provider>
        </div>
    );
}

export default App;
