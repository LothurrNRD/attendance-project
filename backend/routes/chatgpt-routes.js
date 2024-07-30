import express from 'express';
import { getChatResponse } from '../controllers/chatgpt-controller.js';

const router = express.Router();

router.post('/chat', getChatResponse);

export default chatgptRoutes;
