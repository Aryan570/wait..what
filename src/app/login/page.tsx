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
//   useEffect(() => {
//     if(localStorage.getItem('myuser')){
//      router.push('/')
//     }
//  }, [])
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
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    const res = await fetch('http://localhost:3000/api/userthere', {
      method: 'POST',
      body: JSON.stringify(values)
    })
    const data = await res.json();
    // console.log(data.res)
    if (data.res === null) router.push('/signup')
    else {
      localStorage.setItem('myuser', JSON.stringify({ token: data.token, username: data.res.name ,password: data.res.password}))
    } router.push('/')
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
