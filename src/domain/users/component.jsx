import { getUser, getUserId } from './services'
import { React , useEffect , useState } from 'react';
import { NavLink } from "react-router-dom";
import { Disconnect } from '../component';
import { following, getFollowers, getFollows, getUserName , isFollowed, unfollowing } from './api';
import { getTweets } from '../tweets/api';

export function ProfilePage(){
    const [name, setName] = useState("");
    const [follows, setFollows] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [isFollow, setIsFollow] = useState();

    useEffect((e)=>{
        async function fetchData() {
            const userName = await getUserName(getUser());
            const userFollows = await getFollows(getUser());
            const userFollowers = await getFollowers(getUser());
            const userFollowStatus = await isFollowed(getUser());

            setName(userName);
            setFollows(userFollows.length);
            setFollowers(userFollowers.length);
            setIsFollow(userFollowStatus);
        }
    
        fetchData();
    },[followers]);

    return(
        <div>
            <p>user {name}</p>
            <p>follows {follows}</p>
            <p>followers {followers}</p>
            {
                isFollow === 0? 
                <button onClick={() => setFollowers(following(getUser()))}>follow</button> :
                 isFollow === 1?
                <button onClick={() => setFollowers(unfollowing(getUser()))}>unfollow</button>
                 : null
            }
            <ShowTweets />
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
                    <p>new tweet</p>
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
export function ShowTweets() {
    const [tweets, setTweets] = useState([]);
    const [editingTweetId, setEditingTweetId] = useState(null);
    const [newContent, setNewContent] = useState("");

    useEffect(() => {
        const fetchTweets = async () => {
            setTweets(await getTweets(getUser()));
        };
        fetchTweets();
    }, []);

    const handleEdit = (tweet) => {
        setEditingTweetId(tweet.id);
        setNewContent(tweet.content);
    };

    const handleUpdate = async () => {
        await updateTweet(getUserId(), newContent);
        setEditingTweetId(null);
        setNewContent("");
        setTweets(await getTweets(getUserId()));
    };

    return (
        <div>
            {tweets && tweets.length > 0 ? (
                tweets.map((tweet, index) => (
                    <li key={index}>
                        {editingTweetId === tweet.id ? (
                            <form>
                                <input
                                    type="text"
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(tweet.id)}>Update</button>
                            </form>
                        ) : (
                            <div>
                                {tweet.content + " le : " + tweet.date }
                                {
                                    (getUserId()===tweet.userid)?
                                        <>
                                            <button onClick={() => handleEdit(tweet)}>Edit</button>
                                            <button onClick={() => deleteTweet(tweet.id)}>Delete</button>
                                        </>:
                                        null
                                }
                            </div>
                        )}
                    </li>
                ))
            ) : (
                <p>Aucun élément à afficher</p>
            )}
        </div>
    );
}