import React, { useContext, createContext } from "react";
import Auth from "./Authentication";

const authContext = createContext();

function useAuth() {
    return useContext(authContext);
}

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export {ProvideAuth, useAuth}

function useProvideAuth() {
    const signin = (username, password, cb) => {
        return Auth.signin(username, password, (token) => {
            console.log('Signed in with token: ' + token)
            window.sessionStorage.setItem("token", token)
            cb();
        });
    };

    const signout = cb => {
        return Auth.signout(() => {
            console.log('Sign out')
            window.sessionStorage.removeItem("token")
            cb();
        });
    };

    const isSigned = cb => {
        console.log('Is signed')
        const token = window.sessionStorage.getItem("token")
        console.log('Token: ' + token)
        if(token) { // && Auth.isValidToken(token)) {
            Auth.isValidToken(token, (isValid) => {
                if(isValid) {
                    console.log('User is logged')
                } else {
                    console.log('User is not logged')
                }
                cb(isValid)
            })

        } else {
            console.log('User is not logged')
            cb(false)
        }
    };

    const hasToken = () => {
        const token = window.sessionStorage.getItem("token")
        console.log('Has token: ' + token)
        if(token) {
            return true
        } else {
            console.log('User is not logged')
            return false
        };
    }

    return {
        isSigned,
        hasToken,
        signin,
        signout
    };
}