import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
 
interface post{
    title?: string,
}
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const justBody = await (request).json()
  let currentDate = new Date().toJSON().slice(0, 10);
  let {db} = await connectToDatabase();
  const res = await db.collection<post>("all_details").updateOne(
    {name: session.name,password: session.password},
    {$push : {"posts": {"title": justBody.title, "content" :justBody.content, "date": currentDate}}}
  )
  return NextResponse.json(res)
}