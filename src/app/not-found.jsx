import Link from 'next/link'
import React from 'react'

const notFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-center p-6">
      <h1 className="text-6xl font-extrabold text-sky-600 mb-3">404</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition"
      >
        Go Home
      </Link>
    </div>
  )
}

export default notFoundPage