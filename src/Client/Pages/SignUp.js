import React from 'react';
import {Form, FormControl, Container} from 'react-bootstrap';
import Button from '../Button/Button';
import {useState} from 'react';
import axios from 'axios';
import './SignIn.css';


function SignUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");

    async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				firstName,
                lastName,
				email,
				password,
			}),
		})

		const data = await response.json()

		if (data.status === 'ok') {
			console.log('ok');
            window.location.href = '/login'
		}
    }
 
    //onSubmit={(e)=>handleSubmit(e)}
    return (
        <div className="loginPageForm">
            <h1>Sign up</h1>
            <p>Create an account so you can enjoy free acces to the website</p>
            <Form onSubmit={registerUser}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name"  name="lastName" value={lastName} onChange={(e) => setLasttName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-5" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button tag="input" className="primaryBtn medium" type="submit">Create account</Button>
            </Form>
        </div>
    );
}
export default SignUp;