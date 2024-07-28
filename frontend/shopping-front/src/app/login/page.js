'use client'; // Ensure this directive is at the top

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        setError(''); // Clear previous errors

        // Basic validation
        if (!email || !password) {
            setError('Email and password are required.');
            return;
        }

        try {
            // Make the API call to the login endpoint
            const response = await axios.post('http://localhost:8000/api/admin/login', {
                email,
                password
            });

            // Handle the response
            if (response.status === 200) {
                // Store token in localStorage (or other preferred method)
                localStorage.setItem('token', response.data.token);

                // Redirect to homepage on successful login
                router.push('/homepage');
            } else {
                // Display error message
                setError(response.data.message || 'Login failed.');
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('An error occurred while logging in.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    LOGIN PAGE
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
        </Container>
    );
};

export default Login;
