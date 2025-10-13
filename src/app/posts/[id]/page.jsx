'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // উদাহরণস্বরূপ API — তুমি চাইলে নিজের API বা JSON ব্যবহার করতে পারো
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('Failed to load post', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-300">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Post not found!
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto p-6 mt-10 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl">
      <div className="relative h-72 w-full rounded-xl overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${post.id}/1200/700`}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="absolute top-4 left-4 bg-white/70 dark:bg-black/50 text-xs px-3 py-1 rounded-full">
          Post ID: #{post.id}
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
          {post.title}
        </h1>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {post.body}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <Link href="/posts" className="inline-block">
            <button className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white rounded-lg hover:scale-105 transition">
              ← Back to Posts
            </button>
          </Link>

          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Post link copied!');
            }}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Copy Link
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
