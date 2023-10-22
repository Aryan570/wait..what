"use client"
import React, { useEffect } from 'react'
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
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})
const Login_Form = () => {
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
    const res = await fetch('http://localhost:3000/api/userthere', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    const data = await res.json();
    if (data.res === null) router.push('/signup')
    else {
      const uname = values.username;
      const upass = values.password;
      const res = await signIn("credentials",{
          uname,
          upass,
          redirect: false
      })
      router.push('/')
    }
    form.reset();
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
                <FormLabel>Enter Your Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant={'default'} className='dark'>Submit</Button>
        </form>
      </div>
    </Form>
  )
}

export default Login_Form
