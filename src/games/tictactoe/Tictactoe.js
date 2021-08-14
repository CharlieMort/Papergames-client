import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import {v4} from "uuid";
import Invite from "../../components/Invite";
import Queue from "../../components/Queue";
import Room from "../../components/Rooms";

export const Tictactoe = ({socket, user}) => {
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
            history.push("/tictactoe");
        })
    }, []);

    if (!user) {
        return <Redirect to={`/login/${id?id:""}`} />
    }

    if (id && !roomInfo) {
        socket.emit("Join", "tictactoe", id, user);
        return <></>;
    }
    if (!roomInfo) {
        return <Room socket={socket} game="tictactoe" user={user} />
    }
    if (roomInfo.inQ) {
        return <Queue game="tictactoe" />
    }

    if (roomInfo.waiting) {
        return <Invite game="tictactoe" code={roomInfo.code} />
    }

    if (location.pathname === "/tictactoe") return <Redirect to={`/tictactoe/${roomInfo.code}`} />

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
                                <button className="formbutton" onClick={() => socket.emit("t_rematch", roomInfo.code, idx)}>yes</button>
                                <button className="formbutton" onClick={() => socket.emit("reject")}>no</button>
                            </div>
                        </div>
                        : <div className="MatchmakingButtons">
                            <button className="formbutton" onClick={() => socket.emit("t_rematch", roomInfo.code, idx)}>rematch</button>
                            <button className="formbutton" onClick={() => socket.emit("reject")}>new game</button>
                        </div>
                }
            </div>
        )
    }

    const shoot = (coords) => {
        if (roomInfo.turn === idx) {
            socket.emit("t_shoot", roomInfo.code, coords)
        }
    }

    return(
        <div className="Panel ttt">
            <div className="vs">
                <p>you</p>
                <p>vs</p>
                <p>{roomInfo.players[idx===0?1:0].user.username}</p>
            </div>
            <h3>
                {
                    roomInfo.turn === idx
                    ? "your turn"
                    : `${roomInfo.players[idx===0?1:0].user.username}'s turn`
                }
            </h3>
            <div className="tttMid">
                <h1>{roomInfo.players[idx].score}</h1>
                <div className="tttGrid">
                    {
                        roomInfo.map.map((row, y) => {
                            return row.map((cell, x) => {
                                return <button className={`tttCell`} key={v4()} onClick={() => shoot([x, y])}>
                                    {
                                        cell === "x"
                                            &&<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                    }
                                    {
                                        cell === "o"
                                            && <div className={`Circle ${cell}`} />
                                    }
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