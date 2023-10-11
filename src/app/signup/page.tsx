"use client"
import React, { useState } from 'react'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/app/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form"
import { Input } from '@/app/components/ui/input'
import { useForm } from 'react-hook-form'
import { toast } from '../components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import {Loader2} from 'lucide-react'
// var jwt = require("jsonwebtoken")
// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

// type Repo = {
//     name: string
//     password: string
// }

// export const getServerSideProps = (async (context) => {
//     const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     const repo = await res.json()
//     return { props: { repo } }
// }) satisfies GetServerSideProps<{
//     repo: Repo
// }>
const formSchema = z
    .object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
        cpassword: z.string().min(8, {
            message: "Password must be at least 8 characters.",
        }),
    })
    .refine((data) => data.password === data.cpassword, {
        message: "Passwords don't match",
        path: ["cpassword"],
    });
const SignUp = () => {
    const [load, setload] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            cpassword: "",
        },
    })
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setload(true);
        const res = await fetch('http://localhost:3000/api/userpost', {
            method: 'POST',
            body: JSON.stringify(values),
        })
        if (res) {
            toast({
                title: "Welcome to the Wait..What:",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">name: {values.username}</code>
                        <p>Your Journey is officially started! Enjoy!!</p>
                    </pre>
                ),
            })
            const uname = values.username
            const upass = values.password
            const res2 = await signIn("credentials", {
                uname, 
                upass, 
                redirect: false
            })
            // console.log("im in signup",res2)
            form.reset();
            router.push('/getimg');
        }
    }
    return (
        <Form {...form}>
            <div className='flex justify-center items-center min-h-screen'>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-slate-900 py-8 rounded-2xl space-y-8 max-w-sm container">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Aryan" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Set Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cpassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Confirm Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant={'default'} className='dark w-full' disabled={load} >{load ? <Loader2 className='animate-spin'/> : "Submit"}</Button>
                </form>
            </div>
        </Form>
    )
}

export default SignUp