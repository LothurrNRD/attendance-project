// pages/products.js
'use client'

import Head from 'next/head';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const StudentsPage = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/students').then((res) => {
            console.log(res.data.students);
            setStudents(res.data.students);
        });
    }, []);

    return (
        <div>
            <Head>
                <title>Children Attendance</title>
                <meta name="description" content="All Children" />
            </Head>

            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">Children Attendance</Button>
                    <Button color="inherit">Total Revenue</Button>
                </Toolbar>
            </AppBar>

            <Container>
                <main>
                    <Grid container spacing={2}>
                        {students.map((student) => (
                            <Grid item key={student.id} xs={12} sm={6} md={4}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            Utku Arslan
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            1th Class
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </Container>
        </div>
    );
};

export default StudentsPage;
