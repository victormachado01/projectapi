import React from 'react'

import './App.css';
import AddFarmModal from './views/AddFarms' 
import Login from './views/Login'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/cadastro">
        </Route>
        <Route path="/">
          
          <AddFarmModal/>
        </Route>
     </Switch>
    </Router>
  );
}

export default App;
