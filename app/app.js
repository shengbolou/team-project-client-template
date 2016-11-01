import React from 'react';
import ReactDOM from 'react-dom';
import Activity from './component/activity';
import Navbar from './component/navbar';

//render navbar
ReactDOM.render(
  <Navbar />,
  document.getElementById('navbar')
);

//render main
ReactDOM.render(
  <Activity />,
  document.getElementById('main')
);
