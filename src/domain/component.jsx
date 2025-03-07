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
    <div className="fixed bottom-4 left-4">
        {redirect && <Navigate to="/" />}
        <button 
          onClick={disconnect} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
      
    );

}