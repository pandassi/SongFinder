import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import App from './App';
import * as serviceWorker from './serviceWorker'; //cached to appear offline to load page etc. Parallel server service
import "./style/song-finder.scss";

// Users alerts configuration 
toast.configure('🤭', {
    autoClose: 3500,
    draggable: true,
    closeOnClick: true,
    pauseOnHover: true,
    position: toast.POSITION.BOTTOM_RIGHT
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
