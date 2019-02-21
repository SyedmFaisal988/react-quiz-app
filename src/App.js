import React, { Component } from 'react';
import './App.css';
import Router from './Route';

const data = {
  userName: "admin",
  totQuest: "2",
  loadTest: [0,0],
  testName:"Blah blah",
  correctAns: 2,
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router/> 
      </div>
    );
  }
}

export default App;
