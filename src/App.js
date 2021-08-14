import './App.css';
import Battleship from "./games/battleship/Battleship";
import socketIO from "socket.io-client";
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from "react-router-dom";
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useState } from 'react';
import { Tictactoe } from './games/tictactoe/Tictactoe';
import { Games } from './components/Games';
import Connect4 from './games/connect4/Connect4';

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
          <Link className="Title" to="/games">
            <h1>paper<br></br>games.</h1>
          </Link>
          <div className="Navbar">
            <Link className="Navlink" to="/battleship">battleship</Link>
            <Link className="Navlink" to="/tictactoe">tic tac toe</Link>
            <Link className="Navlink" to="/connect4">connect 4</Link>
          </div>
        </div>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/battleship/:id?">
            <Battleship socket={socket} user={user} />
          </Route>
          <Route path="/signup/:id?">
            <Signup setUser={setUser} />
          </Route>
          <Route path="/login/:id?">
            <Login setUser={setUser} />
          </Route>
          <Route path="/tictactoe/:id?">
            <Tictactoe socket={socket} user={user} />
          </Route>
          <Route path="/games/:id?">
            <Games />
          </Route>
          <Route path="/connect4/:id?">
            <Connect4 socket={socket} user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
