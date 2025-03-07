import { React, useState } from 'react';
import { Navigate, NavLink } from "react-router-dom";
import { setSearchPseudo } from '../api';

export function TopPage() {
    const [redirect, setRedirect] = useState("");
    const [pseudo, setPseudo] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault();
        setRedirect(await setSearchPseudo(pseudo));
    };

    return (
        <div className="bg-white shadow-md w-full py-4 px-6 fixed top-0 left-0">
      {redirect && <Navigate to={`/profile?id=${redirect}`} />}
      
      {/* Navigation Links - Each takes 1/3 of the width */}
      <div className="flex">
        <NavLink 
          to="/notif" 
          className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors py-2"
        >
          Notification
        </NavLink>
        <NavLink 
          to="/tweet" 
          className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors py-2"
        >
          Tweets
        </NavLink>
        <NavLink 
          to="/newtweet" 
          className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors py-2"
        >
          New Tweet
        </NavLink>
      </div>

      {/* Search Form Below the Links */}
      <form 
        onSubmit={handleSearch} 
        className="mt-4 flex justify-center space-x-2"
      >
        <input
          type="text"
          required
          value={pseudo}
          placeholder="Pseudo"
          onChange={(e) => setPseudo(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Valider
        </button>
      </form>
    </div>
    );
}

export default TopPage; 