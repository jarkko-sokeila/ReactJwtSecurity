import React, {useState} from "react";
import { useHistory, useLocation } from "react-router-dom";
import '../page/LoginPage.css';
import { useAuth } from '../auth/AuthContext';
import {Alert, Button, Card, Form, FormControl, InputGroup} from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';

const LoginPage = () => {
    let history = useHistory()
    let location = useLocation()
    let auth = useAuth()

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [error, setError] = useState(false)
    const [validated, setValidated] = useState(false)

    let { from } = location.state || { from: { pathname: "/" } }

    const findFormErrors = () => {
        const { username, password } = form
        const newErrors = {}
        // username errors
        if ( !username || username === '' ) newErrors.username = 'cannot be blank!'
        else if ( username.length > 10 ) newErrors.username = 'username is too long!'
        // password errors
        if ( !password || password === '' ) newErrors.password = 'cannot be blank!'
        else if ( password.length > 10 ) newErrors.password = 'password is too long!'

        return newErrors
    }

    const handleSubmit = (event) => {
        console.log('Handle submit')
        const { username, password } = form
        setError(false)
        setValidated(false);

        const newErrors = findFormErrors()
        console.log(newErrors)
        if (Object.keys(newErrors).length > 0) {
            console.log('Invalid form')
            setErrors(newErrors)
            event.preventDefault();
            event.stopPropagation();
        } else {
            console.log('Do authentication')
            setError(false)
            auth.signin(username, password, () => {
                history.replace(from)
            }, (data) => {
                setError(true)
                setValidated(true);
            });

            event.preventDefault();
            event.stopPropagation();
        }
    };

    const setField = (field, value) => {
        //console.log('Set field: ' + field + ', value: ' + value)
        setForm({
            ...form,
            [field]: value
        })

        // Check and see if errors exist, and remove them from the error object:
        if ( !!errors[field] ) setErrors({
            ...errors,
            [field]: null
        })
    }

    return (
        <div className="center">
        <Card style={{ width: '25rem' }}>
            <Card.Header>Login</Card.Header>
            <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><Icon.PersonCircle /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl required id="inlineFormInputGroupUsername" placeholder="Username" onChange={ e => { setField('username', e.target.value) }} />
                            <Form.Control.Feedback type='invalid'>
                                { errors.username }
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="inlineFormInputGroupPassword" srOnly>Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><Icon.Key /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl required type="password" id="inlineFormInputGroupPassword" placeholder="Password" onChange={ e => { setField('password', e.target.value) }} isInvalid={ !!errors.password } />
                            <Form.Control.Feedback type='invalid'>
                                { errors.password }
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" variant="primary">Login</Button>
                    </Form.Group>
                    {error &&
                        <Alert variant="danger">Invalid username or password</Alert>
                    }
                </Form>
            </Card.Body>
        </Card>
        </div>
    )
}

export default LoginPage