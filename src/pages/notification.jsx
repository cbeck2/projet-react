import { React } from 'react';
import { AuthGuard } from '../domain/auth/services'

function Notification(){
    return(
        <div>
            notification
        </div>
    )
}
export default AuthGuard(Notification);