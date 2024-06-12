'use client'

import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Profiles = () => {

    const { data: session } = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await res.json()

            setPosts(data)
        }

        if (session?.user.id) fetchPosts()
    }, [])

    const handleDelete = async (post) => {
        const confirmed = confirm('delete this prompt?')

        if(confirmed){
            try {
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'
                })

                const filteredPost = posts.filter((p)=> p._id !== post._id)

                setPosts(filteredPost)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    
    return (
        <Profile
            name='my'
            desc='Welcome to your personalized profile page'
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default Profiles