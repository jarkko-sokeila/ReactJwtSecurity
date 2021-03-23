import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import './App.css';
import {ProvideAuth, useAuth} from './auth/AuthContext'
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage";
import {useEffect, useState} from "react";

function App() {
  return (
      <ProvideAuth>
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <PrivateRoute path="/">
                    <MainPage/>
                </PrivateRoute>
            </Switch>
        </Router>
      </ProvideAuth>
  );
}

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isTokenValidated, setIsTokenValidated] = useState(false);

    useEffect(() => {
        // send jwt to API to see if it's valid
        let token = window.sessionStorage.getItem("token")
        console.log('PrivateRoute effect validate token ' + token)
        if (token) {
            auth.isSigned((isValid) => {
                console.log('PrivateRoute is signed ' + isValid)
                setIsTokenValid(isValid)
                setIsTokenValidated(true);
            })

            /*fetch('http://localhost:8080/auth/validatetoken', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: token,
            })
                .then((res) => {
                    return res.json()
                })
                .then((json) => {
                    console.log('Is valid token response: ' + json.valid)
                    console.log(json)
                    if (json.valid) {
                        setIsTokenValid(true);
                    }
                })
                .catch((err) => {
                    setIsTokenValid(false);
                    window.sessionStorage.removeItem("token")
                })
                .then(() => setIsTokenValidated(true));*/
        } else {
            setIsTokenValidated(true); // in case there is no token
        }

    }, [auth])

    if (!isTokenValidated) return <div />;

    console.log('isTokenValidated: ' + isTokenValidated)
    console.log('isTokenValid: ' + isTokenValid)

    return (
        <Route {...rest} render={({ location }) =>
                auth.hasToken() & isTokenValid ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default App;
