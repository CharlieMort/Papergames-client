import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import Invite from "../../components/Invite";
import Queue from "../../components/Queue";
import Room from "../../components/Rooms";

const Connect4 = ({socket, user}) => {
    const [idx, setIdx] = useState();
    const [roomInfo, setRoomInfo] = useState(undefined);
    const history = useHistory();
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        socket.on("roomInfo", (data) => {
            console.log(data);
            setRoomInfo(data);
        })
        socket.on("index", (index) => {
            setIdx(index)
        })
        socket.on("badCode", () => {
            console.log("Bad Code")
            history.push("/connect4");
        })
    }, []);

    if (!user) {
        return <Redirect to={`/login/${id?id:""}`} />
    }

    if (id && !roomInfo) {
        socket.emit("Join", "connect4", id, user);
        return <></>;
    }
    if (!roomInfo) {
        return <Room socket={socket} game="connect4" user={user} />
    }
    if (roomInfo.inQ) {
        return <Queue game="connect4" />
    }

    if (roomInfo.waiting) {
        return <Invite game="connect4" code={roomInfo.code} />
    }

    console.log(location.pathname);
    if (location.pathname === "/connect4" || location.pathname === "/connect4/") return <Redirect to={`/connect4/${roomInfo.code}`} />
    
    if (roomInfo.winner !== 2) {
        return( 
            <div className="Panel">
                <h1>{roomInfo.winner === idx?"you won.":roomInfo.winner === 3 ? "draw." : "you lost."}</h1>
                {
                    roomInfo.players[idx].rematch
                    ? <p className="inputname">waiting for response...</p>
                    : roomInfo.players[idx===0?1:0].rematch
                        ? <div>
                            <h3 className="tac">oppenenet wants a rematch?</h3>
                            <div>
                                <button className="formbutton" onClick={() => socket.emit("c_rematch", roomInfo.code, idx)}>yes</button>
                                <button className="formbutton" onClick={() => socket.emit("reject")}>no</button>
                            </div>
                        </div>
                        : <div className="MatchmakingButtons">
                            <button className="formbutton" onClick={() => socket.emit("c_rematch", roomInfo.code, idx)}>rematch</button>
                            <button className="formbutton" onClick={() => socket.emit("reject")}>new game</button>
                        </div>
                }
            </div>
        )
    }

    const shoot = (coords) => {
        if (roomInfo.turn === idx) {
            socket.emit("c_shoot", roomInfo.code, coords)
        }
    }

    return(
        <div className="Panel tac">
            <div className="vs">
                <p>you</p>
                <p>vs</p>
                <p>{roomInfo.players[idx===0?1:0].user.username}</p>
            </div>
            <div className="flexcenter">
                <h3>
                    {
                        roomInfo.turn === idx
                        ? "your turn"
                        : `${roomInfo.players[idx===0?1:0].user.username}'s turn`
                    }
                </h3>
                <div className={`SmallCircle ${roomInfo.turn===0?"light":"dark"}`} />
            </div>
            <div className="tttMid">
                <h1>{roomInfo.players[idx].score}</h1>
                <div className="c4Board">
                    {
                        roomInfo.map.map((row, y) => {
                            return row.map((cell, x) => {
                                return <button className="c4Cell" onClick={() => shoot([x, y])}>
                                    <div className={`Circle ${cell}`} />
                                </button>
                            })
                        })
                    }
                </div>
                <h1>{roomInfo.players[idx===0?1:0].score}</h1>
            </div>
        </div>
    )
}

export default Connect4;