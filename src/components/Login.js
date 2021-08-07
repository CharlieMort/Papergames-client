import axios from "axios";
import React, { useState } from "react";

export const Login = ({setUser}) => {
    const [nickname, setNickname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const nickLogin = (e) => {
        e.preventDefault();
        setUser({
            username: nickname,
            guest: true,
            score: 0,
            imgIdx: 0
        })
    }

    const login = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:5000/api/user/login/${username}`)
            .then(res => {
                if (res.data.password === password) {
                    setUser({
                        username,
                        password,
                        guest: false,
                        score: res.data.score,
                        imgIdx: 0
                    })
                }
                else {
                    setError("Username Or Password Is Incorrect");
                }
            })
            .catch(err => {
                console.error(err);
                setError("Username Or Password Is Incorrect");
            });
    }

    return(
        <div className="LoginPage">
            <div>
                <h1>Login</h1>
                <div>
                    <h2>Guest Login</h2>
                    <form onSubmit={nickLogin}>
                        <input type="text" placeholder="Enter Nickname..." className="NickInput" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                        <input type="submit" value="Submit" className="SubmitNick" />
                    </form>
                </div>
                <div>
                    <h2>Account Login</h2>
                    <p className="Error">{error}</p>
                    <form onSubmit={login}>
                        <input type="username" placeholder="Enter Username..." className="NickInput" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Enter Password..." className="NickInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" value="Login" className="SubmitNick" />
                    </form>
                </div>
            </div>
            <h3>Or Sign Up Here</h3>
            <button className="SubmitNick">Sign Up</button>
        </div>
    )
}