import { React, useState } from 'react';
import { Navigate, NavLink } from "react-router-dom";
import { SearchId } from '../api';

export function TopPage() {
    const [redirect, setRedirect] = useState("");
    const [pseudo, setPseudo] = useState("");

    const handleSearch = async (event) => {
        event.preventDefault();
        setRedirect(await SearchId(pseudo));
    };

    return (
        <div className="bg-white shadow-md w-full py-4 px-6 fixed top-0 left-0">
      {redirect && <Navigate to={`/profile?id=${redirect}`} />}
      
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