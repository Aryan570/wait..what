import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb';
 
interface user{
    name: string,
    password: string
}
export async function POST(request: Request) {
  const justBody = await (request).json()
  let {db} = await connectToDatabase();
  const res = await db.collection<user>("all_details").insertOne({
    name: justBody.username,
    password: justBody.password
  })
  return NextResponse.json(res)
}