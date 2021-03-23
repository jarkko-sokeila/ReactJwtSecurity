import React, {useEffect, useState} from "react";
import '../page/MainPage.css'
import {useAuth} from "../auth/AuthContext";
import {useHistory} from "react-router-dom";

const MainPage = (props) => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null);

    let history = useHistory();
    let auth = useAuth();

    let logout = () => {
        auth.signout(() => {
            auth.signout(() => history.push("/"))
        });
    };

    useEffect(() => {
        const token = window.sessionStorage.getItem("token")
        fetch("http://localhost:8080/api/test", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setMessage(result.message);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Main page</h2>
            <button onClick={logout}>Sign out</button>
            <br/>
            <b>Message</b>: {message}
        </div>
    )
}

export default MainPage