import express from 'express';
import { createClass, getAllClasses, getClassById, updateClass } from '../controllers/class-controller.js';

const classesRoutes = express.Router();

classesRoutes.get('/all', getAllClasses);
classesRoutes.get('/:_id', getClassById);
classesRoutes.post('/create', createClass);
classesRoutes.put('/update', updateClass);

export default classesRoutes;
