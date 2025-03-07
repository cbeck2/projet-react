import { React, useEffect, useState } from 'react';
import { getUser } from '../services';
import { following, getFollowers, getFollows, getUserName, isFollowed, unfollowing } from '../api';
import { Disconnect } from '../../component';
import { ShowTweets } from './ShowTweets';

export function ProfilePage() {
    const [name, setName] = useState("");
    const [follows, setFollows] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [isFollow, setIsFollow] = useState();

    useEffect(() => {
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
    }, [followers]);

    return (
        <div className="flex flex-col items-center pt-40 p-4 min-h-screen bg-gray-100">
      {/* Container for Profile & Tweets (Side by Side on Large Screens) */}
      <div className="flex flex-col md:flex-row md:justify-center md:items-start w-full max-w-4xl">
        
        {/* Profile Info (Left Side) */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2 text-center">
          <p className="text-lg font-semibold">User: {name}</p>
          <p className="text-gray-700">Follows: {follows}</p>
          <p className="text-gray-700">Followers: {followers}</p>

          {/* Follow/Unfollow Buttons */}
          {isFollow === 0 ? (
            <button 
              onClick={() => setFollowers(following(getUser()))}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Follow
            </button>
          ) : isFollow === 1 ? (
            <button 
              onClick={() => setFollowers(unfollowing(getUser()))}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Unfollow
            </button>
          ) : null}
        </div>

        {/* Tweets Section (Right Side) */}
        <div className="mt-6 md:mt-0 md:ml-6 w-full md:w-1/2">
          <ShowTweets />
        </div>
      </div>

      {/* Disconnect Button (Bottom Left) */}
      <div className="fixed bottom-4 left-4">
        <Disconnect />
      </div>
    </div>
    );
}

export default ProfilePage; 