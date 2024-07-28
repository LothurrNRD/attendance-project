'use client'

import Head from 'next/head';
import { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Button, Grid, TextField, Paper } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';

const CreateClass = () => {
    const [name, setName] = useState('');
    const [teacher, setTeacher] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const classData = {
            name,
            teacher,
        };

        try {
            const response = await axios.post('http://localhost:8000/api/classes/create', classData);
            console.log('Class added successfully:', response.data);
            // Reset form fields after submission (optional)
            setName('');
            setTeacher('');
        } catch (error) {
            console.error('Error adding class:', error);
        }
    };

    return (
        <div>
            <Head>
                <title>Create Class</title>
                <meta name="description" content="Create Class Page" />
            </Head>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Create Class
                    </Typography>
                    <Link href='/homepage' passHref>
                        <Button color="inherit">Home</Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Add a New Class
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Class Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Teacher Name"
                                    value={teacher}
                                    onChange={(e) => setTeacher(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Add Class
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default CreateClass;
