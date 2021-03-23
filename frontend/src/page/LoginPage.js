import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import '../page/LoginPage.css';
import { useAuth } from '../auth/AuthContext';

const LoginPage = (props) => {
    let history = useHistory()
    let location = useLocation()
    let auth = useAuth()

    let { from } = location.state || { from: { pathname: "/" } }
    let login = () => {
        console.log('Submit login')
        auth.signin('test', 'password', () => {
            history.replace(from)
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <button onClick={login}>Log in</button>
        </div>
    )
}

export default LoginPage