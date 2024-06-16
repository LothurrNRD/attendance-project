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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const ChildrenPage = () => {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null); // Seçili çocuğun bilgilerini saklamak için state
    const [open, setOpen] = useState(false);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        if (!dateString) {
            return 'Date not specified'
        }
        return new Date(dateString).toLocaleDateString('tr-TR', options);
    };
    useEffect(() => {
        axios.get('http://localhost:8001/api/children/all').then((res) => {
            setChildren(res.data.children);
        });
    }, []);
    const handleCloseModal = () => {
        setOpen(false);
    };
    const handleEditChild = (child) => {
        setSelectedChild(child);
        setOpen(true);
    };

    // Çocuğun bilgilerini güncelleme fonksiyonu
    const handleUpdateChild = () => {
        // Burada axios veya başka bir yöntemle çocuğun bilgilerini güncelleyebilirsiniz
        console.log(`Updating child: ${selectedChild.id} - ${selectedChild.name}`);
        // Örneğin: axios.put(`/api/children/${selectedChild.id}`, selectedChild);
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
                    <Button color="inherit">Add Children</Button>
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
                            {children.map((children) => (
                                <TableRow key={children.id}>
                                    <TableCell>{children.name}</TableCell>
                                    <TableCell>{children.surname}</TableCell>
                                    <TableCell>{children.information}</TableCell>
                                    <TableCell>{formatDate(children.birthDate)}</TableCell>
                                    <TableCell>{children.situation === 'signIn' ? 'Signed In' : 'Signed Out'}</TableCell>
                                    <TableCell><Button onClick={() => handleEditChild(children)}>
                                        Update <ModeEditOutlineIcon />
                                    </Button></TableCell>
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
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" id="child-edit-modal" component="div">
                        Edit Child
                    </Typography>
                    <TextField
                        label="Name"
                        defaultValue={selectedChild ? selectedChild.name : ''}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Surname"
                        defaultValue={selectedChild ? selectedChild.surname : ''}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Information"
                        defaultValue={selectedChild ? selectedChild.information : ''}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Birthdate"
                        defaultValue={selectedChild ? formatDate(selectedChild.birthDate) : ''}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleUpdateChild}>
                        Save Changes
                    </Button>
                </Box>
            </Modal>
        </div >
    );
};

export default ChildrenPage;
