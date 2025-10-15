import { NextResponse } from 'next/server'
import React from 'react'

const middleware = (request) => {
  return NextResponse.redirect(new URL ('/registration', request.url))
}

export default middleware

export const config = {
  matcher: '/class/:path*'
}