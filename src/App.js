import './App.css';
import Battleship from "./games/battleship/Battleship";
import socketIO from "socket.io-client";
import logo from "./logo.png";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

const ENDPOINT = "http://localhost:5000";
const socket = socketIO(ENDPOINT);

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Title">
          <img src={logo} alt="logo" />
        </div>
        <hr className="PageBreak"></hr>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/battleship" />
          </Route>
          <Route path="/battleship" exact>
            <Battleship socket={socket} />
          </Route>
          <Route path="/battleship/:id">
            <Battleship socket={socket} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
