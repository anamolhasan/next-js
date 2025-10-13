import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const AllPost = ({posts}) => {
   // ধরে নিলাম `posts` একটি single post object: { id, title, body, imageUrl? }
  const { id, title, body, imageUrl } = posts || {};
  return (
        <article className="max-w-sm mx-auto bg-white/80 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-44 w-full">
        {/* যদি imageUrl না থাকে, তার জন্য placeholder দেওয়া আছে */}
        <Image
          src={
            imageUrl ||
            `https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=1200&auto=format&fit=crop`
          }
          alt={title || "post image"}
          fill
          style={{ objectFit: "cover" }}
          priority={false}
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-2 bg-white/70 dark:bg-black/50 px-3 py-1 rounded-full text-xs font-medium">
          <span className="text-slate-700 dark:text-slate-200">Post</span>
          <span className="text-sky-600 dark:text-sky-300">#{id ?? "—"}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 line-clamp-2">
          {title || "Untitled post"}
        </h3>

        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
          {body || "No description available."}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link href={`/posts/${id}`} className="group inline-flex items-center gap-2">
            <span className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium shadow-md transform group-hover:scale-105 transition-transform">
              Read More
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-gray-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-gray-800 transition"
              onClick={() => {
                // example action: copy title to clipboard
                if (typeof navigator !== "undefined" && title) {
                  navigator.clipboard?.writeText(title);
                  // আপনি চাইলে এখানে toast বা swal যোগ করতে পারেন
                }
              }}
            >
              Copy Title
            </button>

            <button
              type="button"
              className="px-3 py-2 text-xs rounded-lg bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-transparent hover:scale-105 transition transform"
              onClick={() => {
                // উদাহরণ: open share dialog (ব্রাউজারে supported হলে)
                if (navigator.share) {
                  navigator.share({
                    title,
                    text: body?.slice(0, 120),
                    url: typeof window !== "undefined" ? window.location.origin + `/posts/${id}` : "",
                  }).catch(()=>{});
                } else {
                  // fallback
                  alert("Share not supported on this browser.");
                }
              }}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </article>

  )
}

export default AllPost