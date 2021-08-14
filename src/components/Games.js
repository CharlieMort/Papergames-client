import React from "react";
import { Link, useParams } from "react-router-dom";
import battleshipImg from "../imgs/battleship.png";
import tictactoeImg from "../imgs/tictactoe.png";
import connect4Img from "../imgs/connect4.png";

export const Games = () => {
    const { id } = useParams();

    return(
        <div className="Games">
            <Link className="Panel GamePanel" to={`/battleship/${id?id:""}`}>
                <h1>battleship.</h1>
                <img className="GameIconImg" src={battleshipImg} />
            </Link>
            <Link className="Panel GamePanel" to={`/tictactoe/${id?id:""}`}>
                <h1>tictactoe.</h1>
                <img className="GameIconImg" src={tictactoeImg} />
            </Link>
            <Link className="Panel GamePanel" to={`/connect4/${id?id:""}`}>
                <h1>connect 4.</h1>
                <img className="GameIconImg" src={connect4Img} />
            </Link>
        </div>
    )
}