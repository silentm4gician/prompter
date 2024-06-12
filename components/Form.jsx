import Link from 'next/link'
import React from 'react'

const Form = ({type,post,setPost,submiting,handleSubmit}) => {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Post</span>
            </h1>
            <p className='desc text-left max-w-md'>
                {type} and share amazing prompts
            </p>

            <form 
                onSubmit={handleSubmit}
                className='mt-10 w-full maxw-2xl flex flex-col gap-7 glassmorphism'
            >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        your AI prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e)=>setPost({...post, prompt: e.target.value})}
                        placeholder='write your prompt here'
                        required
                        className='form_textarea'
                    />
                </label>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Tag (#producto, #desarrolloWeb, #idea)
                    </span>
                    <input
                        value={post.tag}
                        onChange={(e)=>setPost({...post, tag: e.target.value})}
                        placeholder='#tag'
                        required
                        className='form_input'
                    />
                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href={'/'} className='text-gray-500 text-sm'>
                        cancel
                    </Link>

                    <button
                        type='submit'
                        disabled={submiting}
                        className='px-5 py-1.5 rounded-full bg-primary-orange text-sm text-white'
                    >{type}</button>
                </div>
            </form>
        </section>
    )
}

export default Form