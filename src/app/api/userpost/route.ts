import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb';
import makeHash from '@/app/hashing/hashPass';
 
interface user{
    name: string,
    password: string
}
export async function POST(request: Request) {
  const justBody = await (request).json()
  const pass = makeHash(justBody.password)
  let {db} = await connectToDatabase();
  const res = await db.collection<user>("all_details").insertOne({
    name: justBody.username,
    password: pass
  })
  return NextResponse.json(res)
}