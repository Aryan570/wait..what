"use server"

import { redirect } from "next/navigation";
import { connectToDatabase } from "../../lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
export async function del(form : FormData){
    const session = await getServerSession(authOptions);
    if (!session) redirect('/login')
    let title = form.get('to_del') +"";
    const {db} = await connectToDatabase();
    const res = await db.collection("all_details").updateOne({
        name: session.name,
        password: session.password
    },{$pull : {'posts' : {title : title}}});
    redirect('/')
}