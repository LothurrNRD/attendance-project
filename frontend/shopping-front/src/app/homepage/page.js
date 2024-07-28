// pages/products.js
'use client'

import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ChildrenPage = () => {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const [open, setOpen] = useState(false);
    const [birthDate, setBirthDate] = useState(null);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [information, setInformation] = useState('');

    const formatDate = (dateString) => {
        if (!dateString) {
            return 'Date not specified';
        }
        return dayjs(dateString).format('DD/MM/YYYY');
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/children/all').then((res) => {
            setChildren(res.data.children);
            console.log(res.data.children);
        });
    }, []);

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleEditChild = (child) => {
        setSelectedChild(child);
        setName(child.name);
        setSurname(child.surname);
        setInformation(child.information);
        setBirthDate(child.birthDate ? dayjs(child.birthDate) : null);
        setOpen(true);
    };

    const handleUpdateChild = async () => {
        const formattedBirthDate = birthDate ? birthDate.toISOString() : '';

        const updatedChild = {
            _id: selectedChild._id,
            name,
            surname,
            information,
            birthDate: formattedBirthDate,
            situation: "signOut"
        };
        console.log(updatedChild);

        try {
            const response = await axios.put('http://localhost:8000/api/children/update', updatedChild);
            console.log('Updated:', response.data);
            // Optionally, refresh the children list
            setChildren((prevChildren) => prevChildren.map((child) => (child._id === updatedChild._id ? updatedChild : child)));
        } catch (error) {
            console.error('Error updating child:', error);
        }

        setOpen(false);
    };

    return (
        <div>
            <Head>
                <title>Children Attendance</title>
                <meta name="description" content="All Children" />
            </Head>

            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">Children Attendance</Button>
                    <Link href="/addpage" passHref>
                        <Button color="inherit">Create Child</Button>
                    </Link>
                    <Link href="/createclass" passHref>
                        <Button color="inherit">Create Class</Button>
                    </Link>
                    <Button color="inherit">Total Revenue</Button>
                </Toolbar>
            </AppBar>

            <Container>
                <TableContainer component={Paper} style={{ maxWidth: 1000, margin: 'auto', marginTop: 20 }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Surname</TableCell>
                                <TableCell>Information</TableCell>
                                <TableCell>Birthdate</TableCell>
                                <TableCell>Situation</TableCell>
                                <TableCell>Update Child</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {children.map((child) => (
                                <TableRow key={child._id}>
                                    <TableCell>{child.name}</TableCell>
                                    <TableCell>{child.surname}</TableCell>
                                    <TableCell>{child.information}</TableCell>
                                    <TableCell>{formatDate(child.birthDate)}</TableCell>
                                    <TableCell>{child.situation === 'signIn' ? 'Signed In' : 'Signed Out'}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleEditChild(child)}>
                                            Update <ModeEditOutlineIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="child-edit-modal"
                aria-describedby="modal-for-editing-child"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" id="child-edit-modal" component="div">
                        Edit Child
                    </Typography>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Information"
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Birthdate"
                            value={birthDate}
                            onChange={(newValue) => setBirthDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" color="primary" onClick={handleUpdateChild}>
                        Save Changes
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ChildrenPage;
