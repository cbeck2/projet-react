import {React, useState} from "react"
import {LoginWithInstance} from "./api"
import {registerCheck} from "./services"
import { Navigate } from 'react-router-dom'


export function FormLog (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [local, setLocal] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await LoginWithInstance(email,password,local);
        if (result){
            setEmail("");
            setPassword("");
            setRedirect(true);
        }
    };

    return(
        <form>
            {redirect && <Navigate to="/profile" />}
            <p>email</p>
            <input
                type="email"
                required
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <p>password</p>
            <input
                type="password"
                required
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <p>
                stay logged in
                <input
                    type="checkbox"
                    value={local}
                    onChange={(e) => setLocal(e.target.value)}
                ></input>
            </p>
            <button type="submit" onClick={handleSubmit}>submit</button>
        </form>
    );
}

export function FormSignup (){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vpassword, setVPassword] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await registerCheck(password,vpassword,email,pseudo)
        switch(result){
            case(0):
                setEmail("");
                setPassword("");
                setVPassword("");
                setPseudo("");
                setRedirect(true);
                break;
            case(1):
                //todo afficher message d'erreur mdp pas sécurisé
                break;
            case(2):
                //todo afficher message d'erreur mdp pas identique
                break;
        }
    };

    return(
        <form>
            {redirect && <Navigate to="/profile" />}
            <p>pseudo</p>
            <input
                type="text"
                required
                value={pseudo}
                placeholder="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
            />
            <p>email</p>
            <input
                type="email"
                required
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <p>test</p>
            <input
                type="password"
                required
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <p>verif password</p>
            <input
                type="password"
                required
                value={vpassword}
                placeholder="password"
                onChange={(e) => setVPassword(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>submit</button>
        </form>
    );
}

export default FormLog;