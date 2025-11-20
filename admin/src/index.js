import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { ToastContainer } from 'react-toastify';
import { sessionCheck } from "./redux/action/auth/index";
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './assets/scss/style.scss';

const renderApp = (PreReloadState) => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Provider store={configureStore(PreReloadState)}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Provider>
    );
}

(async () => renderApp(await sessionCheck()))()

serviceWorker.unregister();