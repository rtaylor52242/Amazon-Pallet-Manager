
import { GoogleGenAI, Type } from "@google/genai";

interface ProductResearchResult {
    estimatedPrice: number | null;
    suggestedAsin: string | null;
}

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  // In a real app, you might have better error handling or a setup check.
  // For this example, we'll log an error.
  console.error("API_KEY environment variable not set for Gemini API.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const researchProduct = async (productName: string): Promise<ProductResearchResult | null> => {
    if (!productName || !process.env.API_KEY) {
        console.error("Product name is empty or API key is missing.");
        return null;
    }

    const prompt = `
        Based on the product name "${productName}", research online marketplaces like Amazon.
        Provide the most likely Amazon Standard Identification Number (ASIN) and a realistic estimated current selling price in USD for a new or like-new version of this product.
        Your response must be in JSON format.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        estimatedPrice: {
                            type: Type.NUMBER,
                            description: "The estimated selling price on Amazon in USD. Return null if not found.",
                        },
                        suggestedAsin: {
                            type: Type.STRING,
                            description: "The most likely ASIN for the product. Return null if not found.",
                        },
                    },
                    required: ["estimatedPrice", "suggestedAsin"],
                },
            },
        });
        
        const jsonText = response.text.trim();
        if (!jsonText) {
            console.error("Gemini API returned an empty response.");
            return null;
        }

        const parsedResult = JSON.parse(jsonText) as ProductResearchResult;
        return parsedResult;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get product information from AI.");
    }
};
