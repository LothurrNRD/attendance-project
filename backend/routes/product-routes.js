import express from 'express';
import { createProduct, deleteProduct, getAllProduct, updateProduct } from '../controllers/product-controller.js';

const productRoutes = express.Router();
productRoutes.get('/', getAllProduct);
productRoutes.post('/create', createProduct);
productRoutes.put('/update', updateProduct);
productRoutes.delete('/delete/:_id', deleteProduct)
export default productRoutes;