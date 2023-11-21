import express from 'express';
import { createOrders, getAllOrders, updateOrder } from '../controllers/order-controller.js';

const orderRoutes = express.Router();
orderRoutes.get('/', getAllOrders);
orderRoutes.post('/create', createOrders);
orderRoutes.get('/:_id', getAllOrders);
orderRoutes.put('/update', updateOrder);

export default orderRoutes;