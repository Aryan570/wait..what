"use client"
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { UploadCloud, ImageIcon } from 'lucide-react'
import { Progress } from '../components/ui/progress'
import { useUploadThing } from '@/lib/uploadthing'
import { toast } from '../components/ui/use-toast'
import { useRouter } from 'next/navigation'
const GetImage = () => {
    const UploadDropzone = () => {
        const router = useRouter();
        const [isUploading, setIsUploading] = useState<boolean>(true)
        const [UploadProgress, setUploadProgress] = useState<number>(-1)
        const { startUpload } = useUploadThing("imageUploader")
        const simulateProgress = () => {
            setUploadProgress(0);
            const interval = setInterval(() => {
                setUploadProgress((prevProgress) => {
                    if (prevProgress >= 95) {
                        clearInterval(interval);
                        return prevProgress
                    }
                    return prevProgress + 5;
                })

            }, 500)
            return interval
        }
        return <Dropzone multiple={false} onDrop={async (acceptedFile) => {
            if((!((acceptedFile[0].type).includes("image")))){
                setUploadProgress(-1);
                return toast({
                    title: "This file type is not supported!",
                    description: "Please upload images only (size < 4MB).",
                    variant: "destructive"
                })
            }
            setIsUploading(true);
            const progressInterval = simulateProgress();
            //handle file upload here
            
            const res = await startUpload(acceptedFile)
            if (!res) {
                return toast({
                    title: "Something went wrong!",
                    description: "Please try later.",
                    variant: "destructive"
                })
            }

            const [fileResponse] = res
            const key = fileResponse?.key

            if (!key) {
                clearInterval(progressInterval)
                setUploadProgress(-1);
                return toast({
                    title: "Something went wrong!",
                    description: "Please try later.",
                    variant: "destructive"
                })
            }
            clearInterval(progressInterval);
            setUploadProgress(100);
            router.push('/login')
        }}>
            {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div {...getRootProps()} className=' flex items-center justify-center mx-auto max-w-fit'>
                    <div className=''>
                        <label htmlFor='dropzone-file' className='cursor-pointer flex flex-col justify-center items-center'>
                            <div className='flex flex-col justify-center items-center'>
                                <UploadCloud />
                                <p className='text-base'>Upload the Banner picture</p>
                            </div>
                            {acceptedFiles && acceptedFiles[0] && ((acceptedFiles[0].type).includes("image")) ? (
                                <div className='flex items-center max-w-xs mt-2 overflow-hidden divide-x divide-zinc-200'>
                                    <div className='py-2 px-3 h-full grid place-items-center'>
                                        <ImageIcon className='h-4 w-4 text-white' />
                                    </div>
                                    <div className='py-2 px-3 h-full text-xs truncate'>
                                        {acceptedFiles[0].name}
                                    </div>
                                </div>
                            ) : null}
                            {isUploading ? (
                                <div className='max-w-xs w-full mt-4 mx-auto'>
                                    <Progress value={UploadProgress} />
                                </div>
                            ) : null}

                            <input {...getInputProps()} type='file' id='dropzone-file' className='hidden' />
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    }
    return (
        <div className='flex justify-center items-center min-h-screen '>
            <div className='bg-slate-900 py-8 rounded-2xl space-y-8 max-w-xs container'><UploadDropzone /></div>
        </div>
    )
}

export default GetImage
