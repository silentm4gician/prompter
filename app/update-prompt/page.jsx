'use client'

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
const { default: Form } = require("@components/Form")

const EditPrompt = () => 
{
    const searchParams = useSearchParams()
    const promptID = searchParams.get('id')
    const router = useRouter()
    const [submiting, setSubmiting] = useState(false)
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    })

    useEffect(()=>{
        const getPromptDetails = async()=>{
            const res = await fetch(`/api/prompt/${promptID}`)
            const data = await res.json()

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }

        if(promptID) getPromptDetails()
    },[promptID])

    const updatePrompt = async (e)=>
        {
            e.preventDefault()

            setSubmiting(true)

            if(!promptID) return alert('prompt ID not found')

            try
            {
                const res = await fetch(`/api/prompt/${promptID}`,
                    {
                        method:'PATCH',
                        body: JSON.stringify({
                            prompt:post.prompt,
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
            type='Edit'
            post={post}
            setPost={setPost}
            submiting={submiting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt