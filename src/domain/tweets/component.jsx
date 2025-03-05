import { React , useState , useEffect } from 'react';
import { Navigate , NavLink } from "react-router-dom";
import { Disconnect } from '../component';
import { DeleteTweet, PostTweet , getTweets , UpdateTweet } from './api';
import { GetUserId } from './services';

export function FormTweet(){
    const [tweet,setTweet] = useState("");
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await PostTweet(tweet,await GetUserId())
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
            <NavLink to="/profile">
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
            <NavLink to="/profile">
                    <p>profile</p>
            </NavLink>
        </div>
    )
}

export function ShowTweets() {
    const [tweets, setTweets] = useState([]);
    const [editingTweetId, setEditingTweetId] = useState(null);
    const [newContent, setNewContent] = useState("");

    useEffect(() => {
        const fetchTweets = async () => {
            setTweets(await getTweets());
        };
        fetchTweets();
    }, []);

    const handleEdit = (tweet) => {
        setEditingTweetId(tweet.id);
        setNewContent(tweet.content);
    };

    const handleUpdate = async (id) => {
        await UpdateTweet(id, newContent);
        setEditingTweetId(null);
        setNewContent("");
        setTweets(await getTweets());
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
                                {tweet.content}
                                <button onClick={() => handleEdit(tweet)}>Edit</button>
                                <button onClick={() => DeleteTweet(tweet.id)}>Delete</button>
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
