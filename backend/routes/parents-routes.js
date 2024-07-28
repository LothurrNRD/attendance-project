import express from 'express';
import { createParent, getAllParents, getParentById, updateParent } from '../controllers/parents-controller.js';

const parentsRoutes = express.Router();

parentsRoutes.get('/all', getAllParents);
parentsRoutes.get('/:_id', getParentById);
parentsRoutes.post('/create', createParent);
parentsRoutes.put('/update', updateParent);

export default parentsRoutes;
