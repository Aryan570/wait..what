
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { connectToDatabase } from "../../../../lib/mongodb";
const f = createUploadthing();
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const session  = await getServerSession(authOptions);
      const {db} = await connectToDatabase()
      const res = await db.collection("all_details").findOne({
        name: session.name,
        password: session.password
      },{
        projection: {_id:0,name:1,password:1}
      })
      // If you throw, the user will not be able to upload
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: res?.name,userPass: res?.password};
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      const {db} = await connectToDatabase()
      const res = await db.collection("all_details").updateOne({
        name: metadata.userId,
        password: metadata.userPass
      },
      {
        $set:{
            fileURL : `${file.url}`
        },
      })
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;