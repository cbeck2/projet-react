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
        <div>
            {redirect && <Navigate to={`/profile?id=${redirect}`} />}
            <NavLink to="/notif">
                <p>notification</p>
            </NavLink>
            <NavLink to="/tweet">
                <p>tweets</p>
            </NavLink>
            <NavLink to="/newtweet">
                <p>new tweet</p>
            </NavLink>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    required
                    value={pseudo}
                    placeholder="pseudo"
                    onChange={(e) => setPseudo(e.target.value)}
                />
                <button type="submit">valider</button>
            </form>
        </div>
    );
}

export default TopPage; 