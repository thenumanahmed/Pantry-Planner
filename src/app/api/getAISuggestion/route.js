import OpenAI from "openai";

// Initialize OpenAI client
const openAIClient = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Ensure the environment variable is set
});

// api key error
export async function POST(req) {
  try {
    console.log("123")
    // const body = await req.json(); // Parse the request body

    // Call the OpenAI API for a chat completion
    const chatcompletion = await openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a chef and guider to suggest dishes by using all or few products that could be made based on the list of products. If no product could be made, then inform me.",
        },
        {
          role: "user",
          content: `My products are apple, mango, banana, oil, juice.`, 
        },
      ],
    });

    // Return the chat completion response to the client
    return new Response(JSON.stringify(chatcompletion), { status: 200 });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return new Response(JSON.stringify({ error: "Failed to get AI suggestion" }), { status: 500 });
  }
}
