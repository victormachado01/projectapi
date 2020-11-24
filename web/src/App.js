import React, { useEffect } from 'react'
import './App.css';
import Login from './views/Login'
import Register from './views/RegisterUser'
import Home from './views/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from 'react';

function App() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState()
  const user_id = user && user._id

  useEffect(() => {
    const auth = () => {
      return localStorage.getItem('user');
    }
    if(auth() !== null) {
      setAuth(true)
      setUser(JSON.parse(auth()))
    }
  }, [auth, user_id])

  return (
    !auth ? 
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/cadastro" component={Register} />
        </Switch>
      </Router>
      :
      <Router>
        <Switch>
          <Route path="/">
            <Home setAuth={setAuth} user={user}/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
