import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Signup = ({setUser}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [error, setError] = useState("");

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
        <div className="LoginPage">
            <div>
                <h1>Sign Up</h1>
                <div>
                    <h2>Account Signup</h2>
                    <p className="Error">{error}</p>
                    <form onSubmit={signUp}>
                        <input type="username" placeholder="Enter Username..." className="NickInput" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Enter Password..." className="NickInput" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="submit" value="Signup" className="SubmitNick" />
                    </form>
                </div>
            </div>
            <h3>Already have an account?</h3>
            <button className="SubmitNick" onClick={() => history.push("/login")}>Login</button>
        </div>
    )
}