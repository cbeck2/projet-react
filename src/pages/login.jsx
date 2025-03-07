import { React } from 'react'
import { LoginForm } from '../domain/auth/component/LoginForm'
import { RedirSignup } from '../domain/auth/services'

function Login() {

    return (
        <div>
            <LoginForm/>
            <RedirSignup/>
        </div>
    )
}

export default Login
