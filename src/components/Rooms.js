import React, { useEffect, useState } from "react";
import battleshipImg from "../imgs/battleship.png";
import tictactoeImg from "../imgs/tictactoe.png";
import connect4Img from "../imgs/connect4.png";
import axios from "axios";
import {v4} from "uuid";

const Room = ({socket, game, user}) => {
    const [leaderboard, setLeaderboard] = useState([]);

    const Random = () => {
        socket.emit(`q${game}`, user);
    }

    const Invite = () => {
        socket.emit(`create${game}`, user);
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/leaderboard/${game}`)
            .then(res => {
                setLeaderboard(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <div className="Roomswrapper">
            <div className="Panel Rooms">
                <div className="GameIcon">
                    <h1>{game}.</h1>
                    <img className="GameIconImg" src={
                        game === "battleship"
                            ? battleshipImg
                            : game === "tictactoe"
                                ? tictactoeImg
                                : game === "connect4"
                                    ? connect4Img
                                    : ""
                    } />
                </div>
                <div className="Matchmakingbuttons">
                    <button onClick={Random} className="formbutton">find random player</button>
                    <button onClick={Invite} className="formbutton">invite a friend</button>
                </div>
            </div>
            <div className="Panel Leaderboard">
                <h1>leaderboard</h1>
                {
                    leaderboard.map((score, idx) => {
                        return <div className="Score" key={v4()}>
                            <p>{idx+1}. {score.username}</p>
                            <p>{score[`${game}Score`]}</p>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Room;