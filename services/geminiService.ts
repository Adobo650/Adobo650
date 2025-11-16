
import { GoogleGenAI, Type } from "@google/genai";
import type { AppData, GroundingSource } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const socialPostSchema = {
    type: Type.OBJECT,
    properties: {
        platform: { type: Type.STRING, enum: ['Facebook', 'Instagram'], description: "The social media platform." },
        username: { type: Type.STRING, description: "A realistic but fictional username." },
        content: { type: Type.STRING, description: "The text content of the post." },
        likes: { type: Type.INTEGER, description: "A realistic number of likes." },
        comments: { type: Type.INTEGER, description: "A realistic number of comments." },
        avatarUrl: { type: Type.STRING, description: "A placeholder avatar URL from picsum.photos." },
        imageUrl: { type: Type.STRING, description: "Optional image URL from picsum.photos for Instagram posts." },
    },
    required: ['platform', 'username', 'content', 'likes', 'comments', 'avatarUrl'],
};

const adSchema = {
    type: Type.OBJECT,
    properties: {
        headline: { type: Type.STRING },
        description: { type: Type.STRING },
        displayUrl: { type: Type.STRING },
    },
    required: ['headline', 'description', 'displayUrl'],
};


export const fetchData = async (): Promise<AppData> => {
    try {
        const [newsResponse, socialResponse, adsResponse] = await Promise.all([
            // Fetch latest news using Google Search grounding
            ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "What are the top 5 latest news headlines and summaries about Donald Trump from the last 24 hours? Keep summaries to 2-3 sentences.",
                config: {
                    tools: [{ googleSearch: {} }],
                },
            }),
            // Generate simulated social media posts
            ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Generate 6 realistic but fictional social media posts about Donald Trump, as if seen on Facebook and Instagram. Include a mix of supportive and critical viewpoints. For Instagram posts, always include an imageUrl. For avatars and images, use placeholder URLs from picsum.photos with a size of 200x200 for avatars and 600x400 for images.",
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: socialPostSchema,
                    },
                },
            }),
            // Generate simulated ads
            ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Generate 2 fictional ad copies for Google Ads related to political news websites. The ads should be neutral, focusing on 'staying informed'.",
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: adSchema,
                    },
                },
            })
        ]);

        const newsContent = newsResponse.text;
        const newsSources = (newsResponse.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingSource[]) || [];
        
        const socialPosts = JSON.parse(socialResponse.text.trim());
        const ads = JSON.parse(adsResponse.text.trim());

        return {
            news: {
                content: newsContent,
                sources: newsSources,
            },
            socialPosts,
            ads,
        };

    } catch (error) {
        console.error("Error fetching data from Gemini API:", error);
        throw new Error("Failed to fetch data. Please check your API key and try again.");
    }
};
