import {NextRequest} from "next/server.js";
import getServerUser from "@/lib/auth-server";
import {NextResponse} from "next/server";
import {inngest} from "@/inngest/client";

export async function POST(req:NextRequest) {
    const formData = await req.formData()
    const refImage = formData.get('refImage') as File | null
    const faceImage = formData.get('faceImage') as File | null
    const userInput = formData.get('userInput')
    const user = await getServerUser()

    const inputData = {
        userInput: userInput,
        refImage: refImage ? await getFileBufferData(refImage) : null,
        faceImage: faceImage ? await getFileBufferData(faceImage) : null,
        userEmail: user?.email
    }

    const result = await inngest.send({
        name: 'ai/generate-thumbnail',
        data: inputData
    })


    return NextResponse.json({runId: result.ids[0]})
}

const getFileBufferData = async (file:File) => {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)



    return {
        name: file.name,
        type: file.type,
        size: file.size,
        buffer: buffer.toString('base64')
    }
}