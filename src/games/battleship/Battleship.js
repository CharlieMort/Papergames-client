import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import Queue from "../../components/Queue";
import Rooms from "../../components/Rooms";
import Invite from "../../components/Invite";
import Grid from "./Grid";

const Battleship = ({socket, user}) => {
    const [roomInfo, setRoomInfo] = useState();
    const [idx, setIdx] = useState();
    const location = useLocation();
    const { id } = useParams();
    const history = useHistory();

    console.log(user);

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

    if (!user) {
        return <Redirect to="/login" />
    }

    if (id && !roomInfo) {
        socket.emit("Join", "battleship", user);
        return <></>;
    }
    if (!roomInfo) {
        return <Rooms socket={socket} game="battleship" user={user} />
    }
    if (roomInfo.inQ) {
        return <Queue game="battleship" />
    }

    if (roomInfo.waiting) {
        return <Invite game="battleship" code={roomInfo.code} />
    }

    if (location.pathname === "/battleship") return <Redirect to={`/battleship/${roomInfo.code}`} />

    if (roomInfo.winner !== 2) {
        return( 
            <div className="Panel">
                <h1>{roomInfo.winner === idx?"you won.":"you lost."}</h1>
                {
                    roomInfo.players[idx].rematch
                    ? <p className="inputname">Waiting for response...</p>
                    : roomInfo.players[idx===0?1:0].rematch
                        ? <div>
                            <h3 className="tac">Oppenent Wants A Rematch?</h3>
                            <div className="Buttons yesno">
                                <button className="formbutton" onClick={() => socket.emit("b_rematch", roomInfo.code, idx)}>Yes?</button>
                                <button className="formbutton" onClick={() => socket.emit("reject")}>No?</button>
                            </div>
                        </div>
                        : <div className="MatchmakingButtons">
                            <button className="formbutton" onClick={() => socket.emit("b_rematch", roomInfo.code, idx)}>rematch</button>
                            <button className="formbutton" onClick={() => socket.emit("reject")}>new game</button>
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
    console.log(roomInfo.players[idx===0?1:0].user);
    return(
        <div className="Battleships">
            <div className="Board">
                <h2>Your Board</h2>
                <Grid map={roomInfo.players[idx].map} eshots={roomInfo.players[idx===0?1:0].shots} />
            </div>
            <h2 className="TurnText">
                {
                    idx === roomInfo.turn 
                    ? "your turn"
                    : roomInfo.players[idx===0?1:0].user.username+"'s turn"
                }
            </h2>
            <div className="Board">
                <h2>{roomInfo.players[idx===0?1:0].user.username}'s Board</h2>
                <Grid map={roomInfo.players[idx===0?1:0].map} shots={roomInfo.players[idx].shots} shoot={Shoot} />
            </div>
        </div>
    )
}

export default Battleship;
