import React from "react";
import {v4 as uuidv4} from "uuid";

const Grid = ({map, eshots, shots, shoot}) => {
    if (shots !== undefined) console.log("Shots:" + shots);

    return(
        <div className="Grid">
            {
                shots !== undefined 
                ? map.map((row, y) => {
                    return row.map((cell, x) => {
                        let newArr = shots.filter((shot) => shot[0] === x && shot[1] === y);
                        if (newArr.length > 0) {
                            console.log("Shot Coords:" + newArr);
                            return <Hit val={cell} coords={[x, y]} key={uuidv4()} />
                        }
                        return <Cell coords={[x, y]} key={uuidv4()} shoot={shoot}></Cell>
                    })
                })
                : map.map((row, y) => {
                    return row.map((cell, x) => {
                        let newArr = eshots.filter((shot) => shot[0] === x && shot[1] === y);
                        let shot = "";
                        if (newArr.length > 0) {
                            if (cell === "ship") shot = "hit";
                            else shot = "miss";
                            console.log(newArr[0]);
                        }
                        return <CellDiv val={cell} coords={[x, y]} key={uuidv4()} shot={shot} />
                    })
                })
            }
        </div>
    )
}

export const Cell = ({coords, shoot}) => {
    return(
        <button className="Cell" onClick={() => shoot(coords)}></button>
    )
}

export const CellDiv = ({val, shot}) => {
    return(
        <div className={`Cell ${val}`} >
            {
                shot !== ""
                    ?shot === "hit"
                        ?<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="white">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        :<div className="Circle" />
                    : ""
            }
        </div>
    )
}

export const Hit = ({val}) => {
    return(
        <div className={`Cell ${val === "ship"?"Hit":"Miss"} tc`}>
            {
                val === "ship"
                ?<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                :<div className="Circle" />
            }
        </div>
    )
}

export default Grid;