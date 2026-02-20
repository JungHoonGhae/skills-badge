import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(new URL('/', process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000'));
}
