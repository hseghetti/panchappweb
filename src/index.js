import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const fonts = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';
const icons = 'https://fonts.googleapis.com/icon?family=Material+Icons';

document.getElementsByTagName( "head" )[0].appendChild( getStylesheetLink(fonts) );
document.getElementsByTagName( "head" )[0].appendChild( getStylesheetLink(icons) );
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

function getStylesheetLink (url) {
    var link = document.createElement( "link" );

    link.href = url;
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";

    return link;
};