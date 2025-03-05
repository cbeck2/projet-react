import { React } from 'react';
import { AuthGuard } from '../domain/auth/services'
import { FormTweet , TopPageNew } from '../domain/tweets/component';

function NewTweet(){
    return(
        <div>
            <TopPageNew/>
            <FormTweet/>
        </div>
    )
}
export default AuthGuard(NewTweet);