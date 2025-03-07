import { React } from 'react';
import { AuthGuard } from '../domain/auth/services'
import { TopPageNewTweet } from '../domain/tweets/component/TopPageNewTweet';
import { FormTweet } from '../domain/tweets/component/FormTweet';


function NewTweet(){
    return(
        <div>
            <TopPageNewTweet/>
            <FormTweet/>
        </div>
    )
}
export default AuthGuard(NewTweet);