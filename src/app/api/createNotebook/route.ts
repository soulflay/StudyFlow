import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const runtime = "edge"

export async function POST(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return new NextResponse('unauthorized access sign-in/up', { status: 401 });
    }

    const body = await req.json(); 
    const { name } = body;
    const image_description = await generateImagePrompt(name);
    if (!image_description) {
        return new NextResponse("failed to generate image description", {
          status: 500,
        });
    }

    const image_url = await generateImage(image_description);
    if (!image_url) {
        return new NextResponse("failed to generate image ", {
        status: 500,
        });
    }

  const note_ids = await db.insert($notes).values({
      name,
      userId,
      imageUrl: image_url,
    })
    .returning({
      insertedId: $notes.id,
    });

  return NextResponse.json({
    note_id: note_ids[0].insertedId,
  });
}
        












// export async function POST(req: Request) {
//     try {
//         const { userId } = await auth();
//         if (!userId) {
//             return new NextResponse('Unauthorized', { status: 401 });
//         }

//         let body;
//         try {
//             body = await req.json();
//         } catch (error) {
//             return new NextResponse('Invalid JSON payload', { status: 400 });
//         }

//         const { name } = body;
//         if (!name) {
//             return new NextResponse('Missing name field', { status: 400 });
//         }

//         let image_description;
//         try {
//             image_description = await generateImagePrompt(name);
//         } catch (error) {
//             console.error('Error generating image prompt:', error);
//             return new NextResponse('Error generating image prompt', { status: 500 });
//         }

//         console.log({ image_description });

//         return NextResponse.json({ message: "ok", image_description });
//     } catch (error) {
//         console.error('Unexpected error:', error);
//         return new NextResponse('Internal Server Error', { status: 500 });
//     }
// }