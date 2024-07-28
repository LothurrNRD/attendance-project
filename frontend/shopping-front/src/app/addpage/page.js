'use client'

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/en';
import { Container, AppBar, Toolbar, Typography, Button, Grid, TextField, MenuItem, FormControl, InputLabel, Select, Paper } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.locale('en');

const CreateChildren = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [information, setInformation] = useState('');
    const [parents, setParents] = useState([{ name: '', phoneNumber: '' }]);
    const [classes, setClasses] = useState('');
    const [classOptions, setClassOptions] = useState([]);

    // Fetch classes from the database on component mount
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/classes/all'); // Sınıfları almak için API isteği
                setClassOptions(response.data.classes);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleAddParent = () => {
        setParents([...parents, { name: '', phoneNumber: '' }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedBirthDate = birthDate ? dayjs(birthDate).toISOString() : '';
        
        // Create each parent and collect their IDs
        try {
            const parentIds = [];
            for (const parent of parents) {
                console.log(parent)
                const response = await axios.post('http://localhost:8000/api/parents/create', parent);
                console.log(response);
                parentIds.push(response.data.parent._id); // Adjust based on your response structure
            }

            const childData = {
                name,
                surname,
                birthDate: formattedBirthDate,
                information,
                parents: parentIds,
                classes
            };
            console.log(childData);

            const childResponse = await axios.post('http://localhost:8000/api/children/create', childData);
            console.log('Child added successfully:', childResponse.data);

            // Reset form fields after submission (optional)
            setName('');
            setSurname('');
            setBirthDate(null);
            setInformation('');
            setParents([{ name: '', phoneNumber: '' }]);
            setClasses('');
        } catch (error) {
            console.error('Error adding child or parents:', error);
        }
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
                    <Link href='/homepage' passHref>
                        <Button color="inherit">Home</Button>
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
                                            inputFormat="DD/MM/YYYY" // Set the input format
                                            mask="__/__/____" // Set the input mask
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
                                            <MenuItem key={option._id} value={option._id}>
                                                {option.name}
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
