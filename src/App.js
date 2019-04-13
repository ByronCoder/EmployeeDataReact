import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FetchEmployee from './components/FetchEmployee';
import AddEmployee from './components/AddEmployee';

class App extends Component {
  render() {
    return (
      <div>
         <AddEmployee />
        <FetchEmployee />
       
      </div>
    );
  }
}

export default App;
