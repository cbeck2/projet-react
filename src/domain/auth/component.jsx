import { React, useState } from "react"
import { LoginWithInstance } from "./api"
import { registerCheck } from "./services"
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

export function RegistrationForm() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [userId, setUserId] = useState("");

    const handleRegistrationSubmit = async (event) => {
        event.preventDefault();
        const registrationResult = await registerCheck(
            passwordInput,
            confirmPasswordInput,
            emailInput,
            usernameInput
        );

        switch (registrationResult) {
            case 0:
                setEmailInput("");
                setPasswordInput("");
                setConfirmPasswordInput("");
                setUsernameInput("");
                setUserId(sessionStorage.getItem("user") || localStorage.getItem("user"));
                setShouldRedirect(true);
                break;
            case 1:
                // TODO: Display password security error message
                break;
            case 2:
                // TODO: Display email format error message
                break;
            case 3:
                // TODO: Display username taken error message
                break;
        }
    };

    return (
        <form onSubmit={handleRegistrationSubmit}>
            {shouldRedirect && <Navigate to={`/profile?id=${userId}`} />}
            <p>Username</p>
            <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
            />
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
            <p>Confirm Password</p>
            <input
                type="password"
                required
                value={confirmPasswordInput}
                onChange={(e) => setConfirmPasswordInput(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
}

export default LoginForm;