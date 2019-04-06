import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FetchEmployee from './components/FetchEmployee';

class App extends Component {
  render() {
    return (
      <div>
        <FetchEmployee />
      </div>
    );
  }
}

export default App;
