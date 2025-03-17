import { GoogleGenerativeAI } from "@google/generative-ai";
import { SUMMARY_SYSTEM_PROMPT } from "@/lib/utils";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function generateSummary({ text }: { text: string }) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-002",
      generationConfig: { temperature: 0.7, maxOutputTokens: 150 },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${text}`,
            },
          ],
        },
      ],
    };

    const { response } = await model.generateContent(prompt);
    return response.text();
  } catch (err: any) {
    if (err.status === 429) {
      throw new Error("Rate limit exceeded");
    }
    console.error("Error while generating summary via gemini", err);
    throw err;
  }
}
