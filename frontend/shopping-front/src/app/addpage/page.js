// pages/create-children.js
'use client'

import Head from 'next/head';
import { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Container, AppBar, Toolbar, Typography, Button, Grid, TextField, MenuItem, FormControl, InputLabel, Select, FormControlLabel, Checkbox, FormGroup, FormLabel, Paper, Box } from '@mui/material';
import Link from 'next/link';

const CreateChildren = () => {
    // State for form fields
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [information, setInformation] = useState('');
    const [parents, setParents] = useState([{ name: '', phoneNumber: '' }]);
    const [classes, setClasses] = useState('');
    const classOptions = ['1th', '2th', '3th'];

    // Handler for adding new parent
    const handleAddParent = () => {
        setParents([...parents, { name: '', phoneNumber: '' }]);
    };

    // Handler for submitting form
    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission here (e.g., send data to backend)
        console.log({
            name,
            surname,
            birthDate,
            information,
            parents,
            classes
        });
        // Reset form fields after submission (optional)
        setName('');
        setSurname('');
        setBirthDate(null);
        setInformation('');
        setParents([{ name: '', phoneNumber: '' }]);
        setClasses('');
    };

    return (
        <div>
            <Head>
                <title>Create Children</title>
                <meta name="description" content="Create Children Page" />
            </Head>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Create Children
                    </Typography>
                    <Link href='/homepage' passHref><Button color="inherit">Home</Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom>
                        Add a Child
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            label="Birthdate"
                                            value={birthDate}
                                            onChange={(newValue) => setBirthDate(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                            fullWidth
                                            required
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Information"
                                    value={information}
                                    onChange={(e) => setInformation(e.target.value)}
                                />
                            </Grid>
                            {parents.map((parent, index) => (
                                <Grid container item spacing={2} key={index}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Parent's Name"
                                            value={parent.name}
                                            onChange={(e) => {
                                                const newParents = [...parents];
                                                newParents[index].name = e.target.value;
                                                setParents(newParents);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Phone Number"
                                            value={parent.phoneNumber}
                                            onChange={(e) => {
                                                const newParents = [...parents];
                                                newParents[index].phoneNumber = e.target.value;
                                                setParents(newParents);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button variant="outlined" onClick={handleAddParent}>
                                    Add Another Parent
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel id="class-label">Class</InputLabel>
                                    <Select
                                        labelId="class-label"
                                        value={classes}
                                        onChange={(e) => setClasses(e.target.value)}
                                    >
                                        {classOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Add Child
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default CreateChildren;
