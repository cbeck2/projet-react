import { React , useState , useEffect } from 'react';
import { Navigate , NavLink } from "react-router-dom";
import { Disconnect } from '../component';
import { deleteTweet, postTweet , getFollowedTweets , updateTweet } from './api';
import { formatDate, getUserId } from './services';

export function FormTweet(){
    const [tweet,setTweet] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await postTweet(tweet,getUserId())
        result ? setRedirect(true) : console.log("erreur envoi tweet")
    }

    return(
        <div>
            {redirect && <Navigate to="/tweet" />}
            <form>
            <input
                type="text"
                required
                value={tweet}
                placeholder="tweet de tweetos"
                onChange={(e) => setTweet(e.target.value)}
            />
            <button type="submit" onClick={handleSubmit}>submit</button>
            </form>
            <Disconnect />
        </div>
    )
}

export function TopPageNew(){
    return(
        <div>
            <NavLink to="/notif">
                    <p>notification</p>
            </NavLink>
            <NavLink to="/tweet">
                    <p>tweet</p>
            </NavLink>
            <NavLink to={`/profile?id=${sessionStorage.getItem("user") ?? localStorage.getItem("user")}`}>
                    <p>profile</p>
            </NavLink>
        </div>
    );
}

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

export function ShowTweets() {
    const [tweets, setTweets] = useState([]);
    const [editingTweetId, setEditingTweetId] = useState(null);
    const [newContent, setNewContent] = useState("");
    const [triageDate,setTriageDate] = useState(true)

    useEffect(() => {
        const fetchTweets = async () => {
            setTweets((await getFollowedTweets(getUserId())).sort((a, b) => a.date - b.date));
        };
        fetchTweets();
    }, []);

    const handleEdit = (tweet) => {
        setEditingTweetId(tweet.id);
        setNewContent(tweet.content);
    };

    function triDate(liste){
        liste.sort((a, b) => a.date - b.date);
        setTriageDate(!triageDate)
        return liste;
    }

    const handleUpdate = async () => {
        await updateTweet(getUserId(), newContent);
        setEditingTweetId(null);
        setNewContent("");
        setTweets(await getFollowedTweets(getUserId()));
    };
    

    return (
        <div>
            {triageDate ? (
                <button onClick={() => setTriageDate(!triageDate)}>changer pour popularité</button>
            ):(
                <button onClick={() => setTweets(triDate(tweets))}>changer pour date</button>
            )}
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
                                {tweet.content + " le : " + formatDate(tweet.date) }
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
