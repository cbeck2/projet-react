export function TopPageNewTweet(){
    return(
        <div>
            <NavLink to="/notif">
                    <p>notification</p>
            </NavLink>
            <NavLink to="/tweet">
                    <p>tweets</p>
            </NavLink>
            <NavLink to={`/profile?id=${sessionStorage.getItem("user") ?? localStorage.getItem("user")}`}>
                    <p>profile</p>
            </NavLink>
        </div>
    );
}