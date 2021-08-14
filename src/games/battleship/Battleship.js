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
    console.log(id);

    useEffect(() => {
        socket.on("roomInfo", (data) => {
            setRoomInfo(data);
        })
        socket.on("index", (index) => {
            setIdx(index)
        })
        socket.on("badCode", () => {
            history.push("/battleship");
        })
    }, []);

    if (!user) {
        return <Redirect to={`/login/${id?id:""}`} />
    }

    if (id && !roomInfo) {
        socket.emit("Join", "battleship", id, user);
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
                    ? <p className="inputname">waiting for a repsonse...</p>
                    : roomInfo.players[idx===0?1:0].rematch
                        ? <div>
                            <h3 className="tac">oppenent wants a rematch?</h3>
                            <div>
                                <button className="formbutton" onClick={() => socket.emit("b_rematch", roomInfo.code, idx)}>yes</button>
                                <button className="formbutton" onClick={() => socket.emit("reject")}>no</button>
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
        if (idx === roomInfo.turn) {
            socket.emit("b_shoot", roomInfo.code, coords);
        }
    }
    
    return(
        <div className="Battleships">
            <div className="Board">
                <div className="Boardtitle">
                    <h2>your board</h2>
                    <h2>{roomInfo.players[idx].score}</h2>
                </div>
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
                <div className="Boardtitle">
                    <h2>{roomInfo.players[idx===0?1:0].user.username}'s Board</h2>
                    <h2>{roomInfo.players[idx===0?1:0].score}</h2>
                </div>
                <Grid map={roomInfo.players[idx===0?1:0].map} shots={roomInfo.players[idx].shots} shoot={Shoot} />
            </div>
        </div>
    )
}

export default Battleship;
