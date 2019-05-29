import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from './components/Home/Home'
import './App.scss'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" name="Home" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
