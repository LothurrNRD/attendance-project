import express from 'express';
import { createChildren, getAllChildren, getChildrenById, updateChildren } from '../controllers/children-controller.js';

const childrenRoutes = express.Router();
childrenRoutes.get('/all', getAllChildren);
childrenRoutes.get('/:_id', getChildrenById);
childrenRoutes.post('/create', createChildren);
childrenRoutes.put('/update', updateChildren);

export default childrenRoutes;