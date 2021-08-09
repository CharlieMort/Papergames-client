import React from "react";
import battleshipImg from "../imgs/battleship.png";

const Room = ({socket, game, user}) => {
    const Random = () => {
        socket.emit(`q${game}`, user);
    }

    const Invite = () => {
        socket.emit(`create${game}`, user);
    }

    return(
        <div className="Panel Rooms">
            <div className="GameIcon">
                <h1>{game}.</h1>
                <img src={battleshipImg} />
            </div>
            <div className="Matchmakingbuttons">
                <button onClick={Random} className="formbutton">find random player</button>
                <button className="formbutton">invite a friend</button>
            </div>
        </div>
    )
}

export default Room;