import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import './index.css';
import App from './App';
import {BrowserRouter as Router}from "react-router-dom"
import { Provider } from 'react-redux';

import store from './redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        
           <App />
           

    </Provider>
    </Router>
  </React.StrictMode>
);

