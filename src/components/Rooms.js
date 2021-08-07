import React from "react";

const Room = ({socket, game, user}) => {
    const Random = () => {
        socket.emit(`q${game}`, user);
    }

    const Invite = () => {
        socket.emit(`create${game}`, user);
    }

    return(
        <div className="Matchmaking">
            <img src="" />
            <div>
                <h1><u>{game.substring(0,1).toUpperCase() + game.substring(1)}</u></h1>
                <div className="Matchmakingbuttons">
                    <button onClick={Random} className="button">Find Random Player</button>
                    {
                        // <button onClick={Invite} className="button">Invite Friend</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Room;