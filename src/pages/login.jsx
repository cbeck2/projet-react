import { React } from 'react'
import { FormLog } from '../domain/auth/component'
import { RedSignup } from '../domain/auth/services'

function Login() {

    return (
        <div>
            <FormLog/>
            <RedSignup/>
        </div>
    )
}

export default Login
