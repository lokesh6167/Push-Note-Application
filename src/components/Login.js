import React, { useState } from "react";
import axios from "axios"
import '../App.css';
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)

    const validateUser = () => {
        axios.post('https://dummyjson.com/auth/login', { username: username, password: password })
            .then(response => {
                console.log(response)
                navigate('home')
            })
            .catch(error => {
                console.log(error)
                setErrorMessage(true)
            }
            )

    }

    return (
        <div class="container">
            <div class="card">
                <h2>Login Form</h2>
                <form>
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errorMessage && <p className="error-message">Invalid Credentials</p>}
                    <button onClick={() => validateUser()}>Login</button>
                </form>
            </div>
        </div>
    )
}