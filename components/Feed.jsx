'use client'

import { useEffect, useState } from "react"
import PromptCard from "./PromptCard"
export const dynamic = 'force-dynamic';

const PromptCardList = ({ data, handleTagClick }) => {
    return <div className="mt-16 prompt_layout">
        {data.map((post) =>
            <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
            />)}
    </div>
}

const Feed = () => {
    const [search, setSearch] = useState('')
    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const res = await fetch('/api/prompt', {cache:'reload'})
        const data = await res.json()

        setPosts(data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="search"
                    value={search}
                    required
                    className="search_input peer"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={() => { }}
            />
        </section>
    )
}

export default Feed