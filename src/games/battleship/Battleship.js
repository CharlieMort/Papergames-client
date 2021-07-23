import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import Queue from "../../components/Queue";
import Rooms from "../../components/Rooms";
import Invite from "../../components/Invite";
import Grid from "./Grid";

const Battleship = ({socket, code}) => {
    const [roomInfo, setRoomInfo] = useState();
    const [idx, setIdx] = useState();
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        socket.on("roomInfo", (data) => {
            setRoomInfo(data);
            console.log(data);
        })
        socket.on("index", (index) => {
            setIdx(index)
        })
        socket.on("badCode", () => {
            history.push("/battleship");
        })
    }, []);

    if (id && !roomInfo) {
        socket.emit("Join", "battleship", id);
        return <></>;
    }
    if (!roomInfo) {
        return <Rooms socket={socket} game="battleship" />
    }
    if (roomInfo.inQ) {
        return <Queue game="Battleship" />
    }

    if (roomInfo.waiting) {
        return <Invite game="battleship" code={roomInfo.code} />
    }

    if (location.pathname === "/battleship") return <Redirect to={`/battleship/${roomInfo.code}`} />

    if (roomInfo.winner !== 2) {
        return( 
            <div className="Outcome">
                <h1>{roomInfo.winner === idx?"You won battleships!!":"You lost battleships :("}</h1>
                {
                    roomInfo.players[idx].rematch
                    ? <h3>Waiting for response...</h3>
                    : roomInfo.players[idx===0?1:0].rematch
                        ? <div>
                            <h3>Oppenent Wants A Rematch?</h3>
                            <div className="Buttons yesno">
                                <button onClick={() => socket.emit("b_rematch", roomInfo.code, idx)}>Yes?</button>
                                <button onClick={() => socket.emit("reject")}>No?</button>
                            </div>
                        </div>
                        : <div className="Buttons">
                            <button onClick={() => socket.emit("b_rematch", roomInfo.code, idx)}>Rematch?</button>
                            <button>New Game</button>
                        </div>
                }
            </div>
        )
    }

    const Shoot = (coords) => {
        console.log("SHooting");
        if (idx === roomInfo.turn) {
            socket.emit("b_shoot", roomInfo.code, coords);
        }
    }

    return(
        <div className="GameWindow">
            <div className="flex sa">
                <div>
                    <h2>Your Board</h2>
                    <Grid map={roomInfo.players[idx].map} eshots={roomInfo.players[idx===0?1:0].shots} />
                </div>
                <h2>
                    {
                        idx === roomInfo.turn 
                        ? "Its Your Turn"
                        : "Enemy's Turn"
                    }
                </h2>
                <div>
                    <h2>Enemy Board</h2>
                    <Grid map={roomInfo.players[idx===0?1:0].map} shots={roomInfo.players[idx].shots} shoot={Shoot} />
                </div>
            </div>
        </div>
    )
}

export default Battleship;
