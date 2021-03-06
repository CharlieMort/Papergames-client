import React, { useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

export const Signup = ({setUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useHistory();
    const { id } = useParams();

    const signUp = (e) => {
        e.preventDefault();
        const user = {
            username,
            password,
        }

        axios.post("http://localhost:5000/api/user/signup", user)
            .then(res => {
                console.log(res.data)
                if (res.data === 1) {
                    setUser({
                        username,
                        password,
                        guest: false,
                        score: 0,
                        imgIdx: 0
                    })
                    history.push(`/games/${id}`)
                }
                else {
                    setError("Username Already Taken");
                }
            })
            .catch(err => {
                console.error(err)
                setError("Username Already Taken");
            });
    }

    return(
        <div className="Panel">
            <div>
                <h1>sign up</h1>
                <div>
                    <p className="inputname">account signup</p>
                    {
                        error &&
                        <p className="Error">{error}</p>
                    }
                    <form onSubmit={signUp}>
                        <input type="username" placeholder="enter username" className="textinp" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="enter password" className="textinp" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" value="sign up" className="formbutton" />
                    </form>
                </div>
            </div>
            <p className="inputname">already have an account? login <a href={`/login/${id}`} className="link">here</a></p>
        </div>
    )
}