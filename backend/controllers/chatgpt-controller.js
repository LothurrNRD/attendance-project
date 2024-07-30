//sk-proj-2vFfPUOQm8AtTRQh6JxVT3BlbkFJkLCTsOMqLKjvplzeMpC6

import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY', // Buraya kendi API anahtarınızı girin
});
const openai = new OpenAIApi(configuration);

export const getChatResponse = async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });
        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

