import { NavLink } from "react-router-dom";

export function TopPageNewTweet(){
    return(
        <nav className="bg-white shadow">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex justify-between items-center h-16">
      <div className="flex w-full">
        <NavLink 
          to="/notif" 
          className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors duration-200 py-2"
        >
          Notification
        </NavLink>
        <NavLink 
          to="/tweet" 
          className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors duration-200 py-2"
        >
          Tweets
        </NavLink>
        <NavLink 
          to={`/profile?id=${sessionStorage.getItem("user") ?? localStorage.getItem("user")}`}
          className="w-1/3 text-center text-gray-700 hover:text-blue-500 transition-colors duration-200 py-2"
        >
          Profile
        </NavLink>
      </div>
    </div>
  </div>
</nav>
    );
}