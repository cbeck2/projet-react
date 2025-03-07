import { React, useEffect, useState } from 'react';
import { formatDate, getUser, getUserId } from '../services';
import { likeTweet, unlikeTweet } from '../api';
import { getTweets, deleteTweet, updateTweet } from '../../tweets/api';

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

    const handleLike = async (tweetId) => {
        await likeTweet(getUserId(), tweetId);
        setTweets(await getTweets(getUser()));
    };

    const handleUnlike = async (tweetId) => {
        await unlikeTweet(getUserId(), tweetId);
        setTweets(await getTweets(getUser()));
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
                                {tweet.content + " le : " + formatDate(tweet.date)}
                                {
                                    (getUserId() === tweet.userid) ?
                                        <>
                                            <button onClick={() => handleEdit(tweet)}>Edit</button>
                                            <button onClick={() => deleteTweet(tweet.id)}>Delete</button>
                                        </>
                                    :
                                        (tweet.like.includes(Number(getUserId())) ?
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

export default ShowTweets; 