'use client'
import React, { useEffect, useState } from 'react'
import AllPost from './components/AllPost'

const PostPage = () => {
    const [posts, setPosts] = useState([]) 
    useEffect(()=>{
        fetch(`https://jsonplaceholder.typicode.com/posts`)
         .then( res => res.json())
         .then(data => setPosts(data))
    },[])
    console.log(posts)
  return (
    <div>
        <h2>All Post Page</h2>
         <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {posts?.map((post) => (
        <AllPost key={post.id} posts={post} />
      ))}
    </div>
    </div>
  )
}

export default PostPage