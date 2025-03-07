import { React, useState } from "react"
import { registerCheck } from "../services"
import { Navigate } from 'react-router-dom'



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
        <form
  onSubmit={handleRegistrationSubmit}
  className="w-full sm:max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8"
>
  {shouldRedirect && <Navigate to={`/profile?id=${userId}`} />}
  <div className="mb-4">
    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
      Username
    </label>
    <input
      type="text"
      id="username"
      required
      value={usernameInput}
      onChange={(e) => setUsernameInput(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
      Email
    </label>
    <input
      type="email"
      id="email"
      required
      value={emailInput}
      onChange={(e) => setEmailInput(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
      Password
    </label>
    <input
      type="password"
      id="password"
      required
      value={passwordInput}
      onChange={(e) => setPasswordInput(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
  <div className="mb-6">
    <label
      htmlFor="confirmPassword"
      className="block text-gray-700 font-medium mb-2"
    >
      Confirm Password
    </label>
    <input
      type="password"
      id="confirmPassword"
      required
      value={confirmPasswordInput}
      onChange={(e) => setConfirmPasswordInput(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
  >
    Register
  </button>
</form>
    );
}