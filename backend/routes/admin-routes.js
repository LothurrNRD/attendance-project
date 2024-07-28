import express from 'express';
import { createAdmin, login } from '../controllers/admin-controller.js';

const adminRoutes = express.Router();

adminRoutes.post('/create', createAdmin);
adminRoutes.post('/login', login);

export default adminRoutes;
