
import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"

// GET
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) return new Response('prompt not found', { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response('Failed to get all prompts', { status: 500 })
    }
}

// PATCH
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()

    try {
        await connectToDB()

        const exitingPrompt = await Prompt.findById(params.id)

        exitingPrompt.prompt = prompt
        exitingPrompt.tag = tag

        await exitingPrompt.save()

        return new Response(JSON.stringify(exitingPrompt), { status: 200 })

    } catch (error) {
        return new Response('Failed to update prompt', { status: 500 })
    }
}

// DELETE
export const DELETE = async (request, {params})=>{
    try {
        await connectToDB()

        await Prompt.findByIdAndDelete(params.id)

        return new Response('deleted successfully', { status: 200 })
    } catch (error) {
        return new Response('failed to delete', { status: 500 })
    }
}