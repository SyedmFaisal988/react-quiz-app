import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyChHibfg2aPwjcZjFEWbkZyGE7r4HF5cbM",
    authDomain: "quiz-app-92344.firebaseapp.com",
    databaseURL: "https://quiz-app-92344.firebaseio.com",
    projectId: "quiz-app-92344",
    storageBucket: "quiz-app-92344.appspot.com",
    messagingSenderId: "552269426179"
  };
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
