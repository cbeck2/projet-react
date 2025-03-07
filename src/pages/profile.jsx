import React from 'react';
import { ProfilePage } from '../domain/users/component/ProfilePage';
import { TopPage } from '../domain/users/component/TopPage';
import { AuthGuard } from '../domain/auth/services';

function Profile() {
    return (
        <div>
            <TopPage/>
            <ProfilePage />
        </div>
    );
}

export default AuthGuard(Profile);