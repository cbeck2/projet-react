import { LoginWithInstance } from "../api"
import { React, useState } from "react"
import { Navigate } from 'react-router-dom'

export function LoginForm() {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [useLocalStorage, setUseLocalStorage] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [userId, setUserId] = useState("");
    const [signup, setSignup] = useState(false);

    function redirect(){
        setSignup(true);
    }

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
        <>
            <form
  onSubmit={handleLoginSubmit}
  className="w-full sm:max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8"
>
  {shouldRedirect && <Navigate to={`/profile?id=${userId}`} />}
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
  <div className="mb-6 flex items-center">
    <input
      type="checkbox"
      id="useLocalStorage"
      checked={useLocalStorage}
      onChange={(e) => setUseLocalStorage(e.target.checked)}
      className="mr-2"
    />
    <label htmlFor="useLocalStorage" className="text-gray-700">
      Use Local Storage
    </label>
  </div>
  <button
    type="submit"
    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
  >
    Login
  </button>
</form>
<div className="w-full sm:max-w-md mx-auto mt-4 text-center">
  {signup && <Navigate to="/signup" />}
  <button
    onClick={redirect}
    className="text-blue-500 hover:text-blue-600 font-medium"
  >
    S'inscrire
  </button>
</div>
        </>
    );
}