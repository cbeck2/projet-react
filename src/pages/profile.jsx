import {React, useState} from 'react';
import { AuthGuard } from '../domain/auth/services'
import {ProfilePage,TopPage} from '../domain/users/component'

function Profile(){
    return(
        <div>
            <TopPage/>
            <ProfilePage/>
        </div>
    )
}
export default AuthGuard(Profile);