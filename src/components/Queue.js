import React from "react";

const Queue = ({game}) => {
    return(
        <div className="Panel">
            <h1>{game}</h1>
            <p className="inputname">searching for a game ...</p>
            <p className="inputname">time elapsed 0s</p>
        </div>
    )
}

export default Queue;