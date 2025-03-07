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
        <div className="space-y-4 w-full max-w-2xl mx-auto">
  {tweets && tweets.length > 0 ? (
    tweets.map((tweet, index) => (
      <li key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-2">
        {editingTweetId === tweet.id ? (
          <form className="flex flex-col gap-2">
            <input
              type="text"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button 
              onClick={() => handleUpdate(tweet.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              Update
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-gray-800">
              {tweet.content} <span className="text-gray-500 text-sm">le {formatDate(tweet.date)}</span>
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {getUserId() === tweet.userid ? (
                <>
                  <button 
                    onClick={() => handleEdit(tweet)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteTweet(tweet.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </>
              ) : (
                tweet.like.includes(Number(getUserId())) ? (
                  <button 
                    onClick={() => handleUnlike(tweet.id)}
                    className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition"
                  >
                    Unlike
                  </button>
                ) : (
                  <button 
                    onClick={() => handleLike(tweet.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    Like
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </li>
    ))
  ) : (
    <p className="text-center text-gray-500">Aucun élément à afficher</p>
  )}
</div>
    );
}

export default ShowTweets; 