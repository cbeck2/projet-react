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
        <div>
            <p>user {name}</p>
            <p>follows {follows}</p>
            <p>followers {followers}</p>
            {
                isFollow === 0 ? 
                <button onClick={() => setFollowers(following(getUser()))}>follow</button> :
                isFollow === 1 ?
                <button onClick={() => setFollowers(unfollowing(getUser()))}>unfollow</button>
                : null
            }
            <ShowTweets />
            <Disconnect />
        </div>
    );
}

export default ProfilePage; 