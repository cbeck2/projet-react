import { useState } from "react";
import { Disconnect } from "../../component";
import { postTweet } from "../api";
import { getUserId } from "../services";
import { Navigate } from "react-router-dom";

export function FormTweet(){
    const [tweet,setTweet] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await postTweet(tweet,getUserId())
        result ? setRedirect(true) : console.log("erreur envoi tweet")
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  {redirect && <Navigate to="/tweet" />}

  <form 
    onSubmit={handleSubmit} 
    className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4"
  >
    <input
      type="text"
      required
      value={tweet}
      placeholder="Tweet de tweetos..."
      onChange={(e) => setTweet(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button 
      type="submit" 
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      Submit
    </button>
  </form>

  <div className="mt-6">
    <Disconnect />
  </div>
</div>
    )
}