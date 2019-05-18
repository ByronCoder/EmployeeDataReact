import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FetchEmployee from './components/FetchEmployee';
import AddEmployee from './components/AddEmployee';
import Home from './components/Home';

import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

class App extends Component {
  render() {
    return (
    
        <Router>
            <div className="topDiv">
              <h2>Welcome to my React CRUD Application</h2>
              <nav className="nav navbar-expand-lg">
              <ul className="navbar-nav mr-auto">
                  <li><Link to={'/'} className="nav-link"> Home </Link></li>
                  <li><Link to={'/addemployee'} className="nav-link">Add Employee</Link></li>
                  <li><Link to={'/fetchemployee'} className="nav-link">Fetch Employee</Link></li>

              </ul>
              </nav>
              <hr />
              </div>
              <Switch>
                    <Route exact path='/' component={Home} />
                    <Route  path='/fetchemployee' component={FetchEmployee} />
                    <Route  path='/addemployee' component={AddEmployee} />
                    <Route  path='/employee/edit:empid' component={AddEmployee} />
              </Switch>
            
        </Router>

      
    )
  }
}

export default App;
