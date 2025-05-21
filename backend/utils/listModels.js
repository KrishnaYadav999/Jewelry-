const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const listModels = async () => {
  try {
    const response = await genAI.listModels();
    console.log("Available models:", response);
  } catch (error) {
    console.error("Error listing models:", error);
  }
};

listModels();
