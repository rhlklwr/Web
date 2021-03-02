import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'tachyons';
import reportWebVitals from './reportWebVitals';

import CardList from './CardList'
import {robots } from './robots';


ReactDOM.render(
  // <React.StrictMode>
  // </React.StrictMode>,
  < CardList robots={robots}/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
