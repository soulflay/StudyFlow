import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
// /api/completion
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  // extract the prompt from the body
  const { prompt } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an intelligent and articulate AI, embedded in a Notion-like text editor, designed to **help students** efficiently complete classwork, assignments, and study topics. 
        - Your responses should **seamlessly extend** the user's thoughts, ensuring a **natural, logical, and well-structured** flow.  
        - Maintain a **consistent tone and style**, making sure the completion **matches** the context of the text.  
        - Keep your responses **concise, yet informative and engaging**, ensuring clarity and coherence.  
        - When applicable, enhance the content with relevant **examples, explanations, or summaries** to support learning.  
        - Always be **helpful, insightful, and academically appropriate**.`
      },
      {
        role: "user",
        content: `
        I am working on a piece of classwork in a Notion-like text editor.
        Please help me complete my thought: ${prompt}  
        Ensure the continuation is **cohesive, clear, and relevant** to my topic.
        Keep it brief and short yet meaningful, aiding my understanding and flow.
        `,
      },
    ],
    
    stream: true,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}