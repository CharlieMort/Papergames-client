import React from "react";

const Queue = ({game}) => {
    return(
        <div className="tc">
            <h1>You Are In The Queue For {game}</h1>
            <h3>Searching For Game...</h3>
        </div>
    )
}

export default Queue;