import React from "react";

const Invite = ({game, code}) => {
    return(
        <div className="Panel">
            <h1>invite your friend to {game}</h1>
            <p>send them this link</p>
            <h4>{`${window.location.href}/${code}`}</h4>
        </div>
    )
}

export default Invite;