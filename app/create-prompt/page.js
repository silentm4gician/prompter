'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
const { default: Form } = require("@components/Form")

const CreatePrompt = () => 
{
    const router = useRouter()
    const {data : session} = useSession()
    const [submiting, setSubmiting] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })

    const createPrompt = async (e)=>
        {
            e.preventDefault()

            setSubmiting(true)

            try
            {
                const res = await fetch('/api/prompt/new',
                    {
                        method:'POST',
                        body: JSON.stringify({
                            prompt:post.prompt,
                            userId: session?.user.id,
                            tag: post.tag
                        })
                    })

                if(res.ok){router.push('/')}

            }
                catch(error){console.log(error)}
                finally{setSubmiting(false)}
        }

    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            submiting={submiting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt