import { useState } from "react";
import { Navigate } from "react-router-dom";

export function Disconnect(){
    const [redirect, setRedirect] = useState(false);
    
    function disconnect() {
        localStorage.removeItem("key");
        localStorage.removeItem("user");
        sessionStorage.removeItem("key");
        sessionStorage.removeItem("user");
        setRedirect(true);
    }
    return(
        <div>
            {redirect && <Navigate to="/" />}
            <button onClick={disconnect}>disconnect</button>
        </div>
    );

}