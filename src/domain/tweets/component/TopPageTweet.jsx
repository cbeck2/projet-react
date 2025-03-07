import { NavLink } from "react-router-dom";

export function TopPageTweet(){
    return(
        <nav className="bg-white shadow-md w-full py-4 px-6 fixed top-0 left-0 z-10">
  <div className="flex">
    <NavLink 
      to="/notif" 
      className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors"
    >
      <p>notification</p>
    </NavLink>
    <NavLink 
      to="/newtweet" 
      className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors"
    >
      <p>new tweets</p>
    </NavLink>
    <NavLink 
      to={`/profile?id=${sessionStorage.getItem("user") ?? localStorage.getItem("user")}`}
      className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors"
    >
      <p>profile</p>
    </NavLink>
  </div>
</nav>

    )
}
