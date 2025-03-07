import { React , useState , useEffect } from 'react';
import { deleteTweet, getTweetsDate , updateTweet, getTweetsPopularity, getFollowedTweet, likeTweet, unlikeTweet, getTweets } from '../api';
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
        <div className="w-full max-w-3xl mx-auto p-4 mt-10">
  {/* Filters */}
  <div className="flex flex-wrap gap-4 items-center mb-6">
    {!byDate && (
      <label className="flex items-center space-x-2 text-gray-700">
        <span>Show by date</span>
        <input 
          type="checkbox" 
          onClick={getByDate} 
          className="form-checkbox text-blue-500"
        />
      </label>
    )}
    {!byPopularity && (
      <label className="flex items-center space-x-2 text-gray-700">
        <span>Show by popularity</span>
        <input 
          type="checkbox" 
          onClick={getByPopularity} 
          className="form-checkbox text-blue-500"
        />
      </label>
    )}
    {!byFollowed && (
      <label className="flex items-center space-x-2 text-gray-700">
        <span>Show by followed</span>
        <input 
          type="checkbox" 
          onClick={getByFollowed} 
          className="form-checkbox text-blue-500"
        />
      </label>
    )}
  </div>

  {/* Tweets List */}
  {tweets && tweets.length > 0 ? (
    <ul className="space-y-4">
      {tweets.map((tweet, index) => (
        <li key={index} className="bg-white shadow rounded-lg p-4">
          {editingTweetId === tweet.id ? (
            <form className="flex flex-col gap-2">
              <input
                type="text"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => handleUpdate(tweet.id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Update
              </button>
            </form>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-gray-800">
                {tweet.content}{" "}
                <span className="text-gray-500 text-sm">le: {formatDate(tweet.date)}</span>
              </p>
              <div className="flex gap-2">
                {getUserId() === tweet.userid ? (
                  <>
                    <button
                      onClick={() => handleEdit(tweet)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTweet(tweet.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  tweet.like.includes(Number(getUserId())) ? (
                    <button
                      onClick={() => handleUnlike(tweet.id)}
                      className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500 transition-colors"
                    >
                      Unlike
                    </button>
                  ) : (
                    <button
                      onClick={() => handleLike(tweet.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Like
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-500">Aucun élément à afficher</p>
  )}
</div>
    );
}

