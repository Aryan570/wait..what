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
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import compareit from '../hashing/comparePass'
import { toast } from '../components/ui/use-toast'
import Link from 'next/link'
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})
const Login_Form = () => {
  const [load, setload] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
  interface user {
    name: string,
    password: string
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setload(true);
    const res = await fetch('/api/userthere', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    const data = await res.json();
    console.log(data);
    if (data.res === null) router.push('/signup')
    else if(!compareit(values.password,data.res.password)){
       setload(false);
       form.reset();
       toast({
        title: "Check your password",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <p>Check your password or username</p>
            </pre>
        ),
    })
    } else {
      const uname = values.username;
      const upass = data.res.password;
      const res = await signIn("credentials",{
          uname,
          upass,
          redirect: false
      })
      router.push('/')
    }
    setload(false);
    form.reset();
  }
  return (
    <Form {...form}>
      <div className='flex justify-center items-center min-h-screen m-3'>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" bg-slate-900 py-8 rounded-2xl space-y-8 max-w-sm container">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-base'>Username</FormLabel>
                <FormControl>
                  <Input className='text-base' placeholder="Aryan" {...field} />
                </FormControl>
                <FormDescription className='text-base'>
                  really? is that your username?
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
                <FormLabel className='text-base'>Enter Your Password</FormLabel>
                <FormControl>
                  <Input className='text-base' placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={'default'} disabled={load} className='dark w-full text-base'>{load? <Loader2 className='animate-spin'/> : "Submit"}</Button>
          <div className='flex justify-center items-center'><Link href={'/signup'}>Don&apos;t have an account?</Link></div>
        </form>
        
      </div>
    </Form>
  )
}

export default Login_Form
