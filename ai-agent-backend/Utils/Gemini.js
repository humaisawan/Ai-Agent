const { GoogleGenerativeAI } = require("@google/generative-ai");
const CustomError = require("./CustomError");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateAIResponse(messages, next) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    
    const history = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;

    return response.text();
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw next(new CustomError("Failed to generate AI response", 400));
  }
}

module.exports = { generateAIResponse };
