import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
