import React from "react";

const Room = ({socket, game}) => {
    const Random = () => {
        socket.emit(`q${game}`);
    }

    const Invite = () => {
        socket.emit(`create${game}`);
    }

    return(
        <div className="Matchmaking">
            <img src="" />
            <div>
                <h1><u>{game.substring(0,1).toUpperCase() + game.substring(1)}</u></h1>
                <div className="Buttons">
                    <button onClick={Random}>Find Random Player</button>
                    <button onClick={Invite}>Invite Friend</button>
                </div>
            </div>
        </div>
    )
}

export default Room;