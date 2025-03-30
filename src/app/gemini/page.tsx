import { GoogleGenAI } from "@google/genai";
import * as readline from 'readline';

const ai = new GoogleGenAI({ apiKey: `${process.env.GEMINI_API_KEY}` });

async function getUserInput(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

export async function prompt(message: string) {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: message,
    });
    console.log(response.text);
}

export default async function main() {
    //   const response = await ai.models.generateContent({
    //     model: "gemini-2.0-flash",
    //     contents: "Explain how AI works in a few words",
    //   });
    //   console.log(response.text);
        const message = await getUserInput("What is your message?");
        await prompt(message);
    }

main();