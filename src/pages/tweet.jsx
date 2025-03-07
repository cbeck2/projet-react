import React from 'react';
import { TopPage } from '../domain/users/component/TopPage';
import { ShowTweets } from '../domain/users/component/ShowTweets';
import { AuthGuard } from '../domain/auth/services';

function Tweet() {
    return (
        <div>
            <TopPage />
            <ShowTweets />
        </div>
    );
}

export default AuthGuard(Tweet);