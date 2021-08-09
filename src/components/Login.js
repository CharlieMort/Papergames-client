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

    const nickChange = (e) => {
        setNickname(e.target.value.slice(0,14));
    }

    return(
        <div className="Panel">
            <h1>login</h1>
            <div>
                <div>
                    <p className="inputname">guest login</p>
                    <form onSubmit={nickLogin}>
                        <input type="text" placeholder="enter nickname..." className="textinp" value={nickname} onChange={nickChange} />
                        <input type="submit" value="submit" className="formbutton" />
                    </form>
                </div>
                <div>
                    <p className="inputname">account login</p>
                    {
                        error &&
                        <p className="Error">{error}</p>
                    }
                    <form onSubmit={login}>
                        <input type="username" placeholder="enter username..." className="textinp" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="enter uassword..." className="textinp" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" value="login" className="formbutton" />
                    </form>
                </div>
            </div>
            <p className="inputname">don't have an account? register <a href="/signup" className="link">here</a></p>
        </div>
    )
}