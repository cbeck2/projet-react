export function TopPageTweet(){
    return(
        <div>
            <NavLink to="/notif">
                    <p>notification</p>
            </NavLink>
            <NavLink to="/newtweet">
                    <p>new tweets</p>
            </NavLink>
            <NavLink to={`/profile?id=${sessionStorage.getItem("user") ?? localStorage.getItem("user")}`}>
                    <p>profile</p>
            </NavLink>
        </div>
    )
}
