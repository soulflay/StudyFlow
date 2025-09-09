import {Configuration, OpenAIApi} from 'openai-edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)
    export async function generateImagePrompt(name: string) {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4o',
            messages: [
                {
                role: "system",
                content: `You are a highly skilled AI art director, specializing in creating detailed and imaginative thumbnail descriptions for notebook covers. Your expertise lies in generating prompts that will elicit stunning and relevant images from a text-to-image model.  Focus on creating prompts that are rich in detail, and tailored for an educational context.`,
            },
              {
                role: "user",
                content: `Please generate a thumbnail description for my notebook titles ${name}`,
                },
            ]
        })
            const data = await response.json();
            const image_description = data.choices[0].message.content;
            return image_description as string; 

            }
        
            catch (error) {
                    console.log(error);
                    throw error;
                }
            }
            
            
            
export async function generateImage(image_description: string) {
    try {
        const response = await openai.createImage({
            prompt: image_description,
            n: 1,
            size: '256x256',
        });
        
        const data = await response.json();
        const image_url = data.data[0].url;
        return image_url as string;
        
    } catch (error) {
        console.error(error);
    }
}
            
       
            