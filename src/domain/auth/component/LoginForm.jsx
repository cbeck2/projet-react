import { LoginWithInstance } from "../api"
import { React, useState } from "react"
import { Navigate } from 'react-router-dom'

export function LoginForm() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [useLocalStorage, setUseLocalStorage] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [userId, setUserId] = useState("");

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const loginResult = await LoginWithInstance(emailInput, passwordInput, useLocalStorage);
        if (loginResult) {
            setEmailInput("");
            setPasswordInput("");
            setUserId(sessionStorage.getItem("user") || localStorage.getItem("user"));
            setShouldRedirect(true);
        }
    };

    return (
        <form onSubmit={handleLoginSubmit}>
            {shouldRedirect && <Navigate to={`/profile?id=${userId}`} />}
            <p>Email</p>
            <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
            />
            <p>Password</p>
            <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
            />
            <p>Use Local Storage</p>
            <input
                type="checkbox"
                checked={useLocalStorage}
                onChange={(e) => setUseLocalStorage(e.target.checked)}
            />
            <button type="submit">Login</button>
        </form>
    );
}