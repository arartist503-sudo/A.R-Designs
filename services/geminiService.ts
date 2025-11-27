import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a creative description for an invitation card based on its title and category.
 * Can optionally take an image (base64) to analyze visual style.
 */
export const generateCardDescription = async (
  title: string,
  category: string,
  imageBase64?: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    let prompt = `You are a creative copywriter for a high-end design studio called "A.R Designs". 
    Write a short, elegant, and appealing description (max 2 sentences) for an invitation card titled "${title}" in the "${category}" category. 
    Focus on the emotions and the event atmosphere.`;

    if (imageBase64) {
      prompt += " Describe the visual style based on the attached image.";
      const response = await ai.models.generateContent({
        model,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg', // Assuming jpeg for simplicity, or detect from source
                data: imageBase64.split(',')[1] || imageBase64,
              }
            },
            { text: prompt }
          ]
        }
      });
      return response.text || "A beautiful design for your special occasion.";
    } else {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      return response.text || "A beautiful design for your special occasion.";
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "A handcrafted design perfect for your special celebration.";
  }
};

/**
 * AI Assistant to help customers write their invitation message.
 */
export const generateInvitationMessage = async (
  eventType: string,
  details: string
): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a warm and inviting message for a ${eventType} invitation. 
      Key details to include: ${details}. 
      Keep it professional yet personal. Limit to 50 words.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Please join us for a celebration filled with joy and laughter.";
  }
};