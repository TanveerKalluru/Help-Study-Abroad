import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  // Try to fetch server session if configured, otherwise return null - keeps this endpoint safe
  let session = null;
  try {
    // getServerSession can be called without explicit authOptions if you set it elsewhere
    session = await getServerSession();
  } catch (err) {
    // ignore - means next-auth isn't configured in this project yet
  }

  const cookies = req.headers.get('cookie') || '';
  return NextResponse.json({ session, cookies });
}
