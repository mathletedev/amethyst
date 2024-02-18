import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

export const rizzbot = genAI.getGenerativeModel({ model: "gemini-pro" });
