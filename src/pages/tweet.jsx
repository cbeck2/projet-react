import React from 'react';
import { TopPageTweet } from '../domain/tweets/component/TopPageTweet';
import { ShowTweets } from '../domain/tweets/component/ShowTweets';
import { AuthGuard } from '../domain/auth/services';

function Tweet() {
    return (
        <div>
            <TopPageTweet />
            <ShowTweets />
        </div>
    );
}

export default AuthGuard(Tweet);