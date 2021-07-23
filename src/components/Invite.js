import React from "react";

const Invite = ({game, code}) => {
    return(
        <div className="flex c tc column">
            <h1>Invite Your Friend To {`${game.substring(0,1).toUpperCase()}${game.substring(1)}`}</h1>
            <h2>Send Them This Link</h2>
            <h3 focused="true">localhost:3000/{game}/{code}</h3>
        </div>
    )
}

export default Invite;