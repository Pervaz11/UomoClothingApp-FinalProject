import fetch from "node-fetch";

const HF_API_KEY = process.env.HF_API_KEY;

export const askAI = async (message, history = []) => {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: {
                        past_user_inputs: history.map(h => h.user),
                        generated_responses: history.map(h => h.bot),
                        text: message,
                    }
                }),
            }
        );

        const data = await response.json();
        return data.generated_text || "Bağışlayın, sizi anlamadım.";

    } catch (error) {
        console.error("AI Error:", error);
        return "AI cavab verə bilmədi.";
    }
};
