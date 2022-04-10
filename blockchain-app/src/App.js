import './App.css';
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BitcoinMiner from './BitcoinMiner';
import About from './about';
import BitcoinHacker from './BitcoinHacker';

function App() {
   
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={About}/>
        <Route path='/about' exact component={About}/>
        <Route path='/miner' component={BitcoinMiner}/>
        <Route path='/hacker' component={BitcoinHacker}/>
      </Switch>
    </Router>
  );
}

export default App;
