import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY
});

export const rizzbot = openai.chat;
