import { React , useState , useEffect } from 'react';
import { deleteTweet, getTweetsDate , updateTweet, getTweetsPopularity, getFollowedTweet, likeTweet, unlikeTweet } from '../api';
import { formatDate, getUserId } from '../services';

export function ShowTweets() {
    const [tweets, setTweets] = useState([]);
    const [editingTweetId, setEditingTweetId] = useState(null);
    const [newContent, setNewContent] = useState("");
    const [byDate,setByDate] = useState(true);
    const [byPopularity,setByPopularity] = useState(false);
    const [byFollowed,setByFollowed] = useState(false);

    useEffect(() => {
        const fetchTweets = async () => {
            setTweets(await getTweetsDate(getUserId()));
        };
        fetchTweets();
    }, []);

    const handleUpdate = async () => {
        await updateTweet(getUserId(), newContent);
        setEditingTweetId(null);
        setNewContent("");
        setTweets(await getTweetsDate(getUserId()));
    };

    const handleLike = async (tweetId) => {
        await likeTweet(getUserId(), tweetId);
        setTweets(await getTweetsDate(getUserId()));
    };

    const handleUnlike = async (tweetId) => {
        await unlikeTweet(getUserId(), tweetId);
        setTweets(await getTweets(getUserId()));
    };

    const getByDate = async () => {
        setTweets(await getTweetsDate());
        setByDate(true);
        setByPopularity(false);
        setByFollowed(false);
    };

    const getByPopularity = async () => {
        setTweets(await getTweetsPopularity());
        setByDate(false);
        setByPopularity(true);
        setByFollowed(false);
    };

    const getByFollowed = async () => {
        setTweets(await getFollowedTweet(getUserId()));
        setByDate(false);
        setByPopularity(false);
        setByFollowed(true);
    };

    const handleEdit = (tweet) => {
        setEditingTweetId(tweet.id);
        setNewContent(tweet.content);
    };
    

    return (
        <div>
            <p>
                {
                    !byDate?
                    <>
                        show by date
                        <input type="checkbox" onClick={getByDate}/>
                    </>:null
                }{
                    !byPopularity?
                    <>
                        show by popularity
                        <input type="checkbox" onClick={getByPopularity}/>
                    </>:null
                }{
                    !byFollowed?
                    <>
                        show by followed
                        <input type="checkbox" onClick={getByFollowed}/>
                    </>:null
                }
            </p>
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
                                {tweet.content + " le : " + formatDate(tweet.date)}
                                {
                                    (getUserId()===tweet.userid)?
                                        <>
                                            <button onClick={() => handleEdit(tweet)}>Edit</button>
                                            <button onClick={() => deleteTweet(tweet.id)}>Delete</button>
                                        </>
                                    :
                                        (tweet.like.includes(Number(getUserId()))?
                                            <button onClick={() => handleUnlike(tweet.id)}>Unlike</button>
                                        :
                                            <button onClick={() => handleLike(tweet.id)}>Like</button>)
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

