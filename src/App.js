import './App.css';
import Battleship from "./games/battleship/Battleship";
import socketIO from "socket.io-client";
import logo from "./logo.png";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useState } from 'react';

const ENDPOINT = "http://localhost:5000";
let socket;
if (process.env.NODE_ENV === "development") {
  socket = socketIO(ENDPOINT);
}
else {
  socket = socketIO();
}

function App() {
  const [user, setUser] = useState();

  return (
    <Router>
      <div className="App">
        <div className="Topbar">
          <div className="Title">
            <h1>paper<br></br>games.</h1>
          </div>
          <div className="Navbar">
            <h3 className="Navlink">battleship</h3>
          </div>
        </div>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/battleship" exact>
            <Battleship socket={socket} user={user} />
          </Route>
          <Route path="/battleship/:id">
            <Battleship socket={socket} user={user} />
          </Route>
          <Route path="/signup" exact>
            {
              user
              ? <Redirect to="/battleship" />
              : <Signup setUser={setUser} />
            }
          </Route>
          <Route path="/login" exact>
            {
              user
              ? <Redirect to="/battleship" />
              : <Login setUser={setUser} />
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
