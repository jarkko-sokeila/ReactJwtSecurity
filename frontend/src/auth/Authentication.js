const Auth = {
    signin(username, password, cb, ecb) {
        const data = { username: username, password: password };
        console.log('Login with username: ' + username + ', password: ' + password)
        fetch('http://localhost:8080/auth/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if(data.token) {
                    cb(data.token)
                } else {
                    ecb(data)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                ecb(error)
            });
    },
    signout(cb) {
        setTimeout(cb, 100)
    },

    isValidToken(token, cb) {
        fetch('http://localhost:8080/auth/validatetoken', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'text/plain',
            },
            body: token,
        }).then((res) => {
            return res.json()
        }).then((json) => {
            console.log('Is valid token response: ' + json.valid)
            console.log(json)
            if (json.valid) {
                cb(true);
            } else {
                cb(false)
            }
        }).catch((err) => {
            cb(false);
        })
    }
};

export default Auth