/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental :{
        serverActions : true,
    },
    images:{
       domains:["uploadthing-prod.s3.us-west-2.amazonaws.com","utfs.io"]
    },
}

module.exports = nextConfig
