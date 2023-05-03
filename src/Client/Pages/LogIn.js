import React from 'react';
import {Form, FormControl, Container} from 'react-bootstrap';
import Button from '../Button/Button';
import { useState } from 'react';
import './SignIn.css';
function LogIn(){
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    async function loginUser(event) {
		event.preventDefault()
       
		const response = await fetch('http://localhost:5000/api/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
        console.log("here");
		const data = await response.json();

		if (data.user) {
            const user = JSON.parse(atob(data.user.split('.')[1]))
            localStorage.setItem('token', data.user)
            localStorage.setItem('userFirstName', user.firstName) 
			alert('Login successful')
			window.location.href = '/'
		} else {
			alert('Please check your username and password')
		}
	}

    return (
        <div className="login-submission">
            <h1>Sign in</h1>
            <p>If you already have an account, sign in using your username and password</p>
            <Form onSubmit={loginUser}>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-5" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button tag="input" className="primaryBtn medium" type="submit">Sign in</Button>
            </Form>
            <div className="sign-up-wrapper mt-5">
                <p>Don't have an account?</p>
                <a href="/signup">Create account</a>
            </div>
        </div>
    );
}
export default LogIn;