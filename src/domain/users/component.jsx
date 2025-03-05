import { GetLoggedUser } from './services'
import {React, useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import { Disconnect } from '../component';
import { ShowTweets } from '../tweets/component';

export function ProfilePage(){
    const [name, setName] = useState("");
    const [follow, setFollow] = useState(0);
    const [follower, setFollower] = useState(0);

    useEffect((e)=>{
        setName(GetLoggedUser)
    },[]);

    return(
        <div>
            <p>utilisateur {name}</p>
            <p>follow {follow}</p>
            <p>follower {follower}</p>
            <ShowTweets/>
            <Disconnect />
        </div>
    )
}

export function TopPage(){
    const [searchPseudo,setSearchPseudo] = useState("");
    return(
        <div>
            <NavLink to="/notif">
                    <p>notification</p>
            </NavLink>
            <NavLink to="/tweet">
                    <p>tweets</p>
            </NavLink>
            <NavLink to="/newtweet">
                    <p>new</p>
            </NavLink>
            <form id="search">
                <input
                    type="text"
                    required
                    value={searchPseudo}
                    placeholder="pseudo"
                    onChange={(e) => setSearchPseudo(e.target.value)}
                />
                <button>valider</button>
            </form>
        </div>
    );
}