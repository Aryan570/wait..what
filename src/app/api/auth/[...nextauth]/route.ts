
import NextAuth from "next-auth/next"
// import Credentials from "next-auth/providers/credentials"
import  CredentialsProvider  from "next-auth/providers/credentials"
import { connectToDatabase } from "../../../../../lib/mongodb";
// { username: { label: string; type: string; placeholder: string; }; password: { label: string; type: string; }; }
export const authOptions = {
    providers : [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials : any) : Promise<any>{
                const {uname,upass} =  credentials;
                const {db} = await connectToDatabase();
                const user = await db.collection("all_details").findOne({
                      name: uname,
                      password: upass
                })
                // console.log(user,credentials,uname,upass)
                return user;
            }
        })
    ],
    session: {
    },
    secret: process.env.NEXTAUTH_SECRET,
    // pages:{
    //     signIn : "/"
    // },
    //see if you need pages
    callbacks: {
        async jwt({ token,user }: any) {
            // token.accessToken = user.access_token;
            // token.idToken = user.id_token;
            // token.name = user.name
            // token.
            if(user){
              token  = user
              // token.user = user;
            }
            // console.log("fuck",user)
            // console.log("fuck",token,"im user",user)
            // console.log(token,"imhere",user)
            return {...token,...user};
        },
         async session ({ session, token }:any){
          // Send properties to the client, like an access_token and user id from a provider.
        //   session.accessToken = token.accessToken
        //   session.user.id = token.id
        //   session.user.name = token.name
        //   session.user.password = token.password
        //   console.log("callbacks",token,user,session)
          session.user = token.user;
          return token
          // return user
        }
      }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };