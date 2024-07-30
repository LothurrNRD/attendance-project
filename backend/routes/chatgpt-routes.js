import express from 'express';
import { getChatResponse } from '../controllers/chatgpt-controller.js';

const chatgptRoutes = express.Router();

chatgptRoutes.post('/chat', getChatResponse);

export default chatgptRoutes;
