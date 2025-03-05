import { React } from 'react';
import { AuthGuard } from '../domain/auth/services'
import { ShowTweets, TopPageTweet } from '../domain/tweets/component';

function Tweet(){
    return(
        <div>
            <TopPageTweet/>
            <h1>tweets</h1>
            <ShowTweets/>
        </div>
    )
}
export default AuthGuard(Tweet);