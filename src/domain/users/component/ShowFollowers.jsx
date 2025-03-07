import { useEffect, useState } from "react";
import { getFollowers, SearchPseudo } from "../api";
import { getUserId } from "../services";
import { NavLink } from "react-router-dom";

export function ShowFollowers(){
    const [followers, setFollowers] = useState([]);
    useEffect(() => {
            async function fetchData() {
                setFollowers(await SearchPseudo(await getFollowers(getUserId())));
            }
            fetchData();
        }, [])

    return(
        followers.map((follower) => (
            <div key={follower.id} className="px-4 py-2 border-b last:border-0">
                <NavLink
                    to={"/profile?id="+follower.id}
                    className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors py-2"
                >
                    {follower.pseudo}
                </NavLink>
            </div>
        ))
    );
}