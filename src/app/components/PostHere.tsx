"use client"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Textarea } from "./ui/textarea"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
const formSchema = z
  .object({
    title: z.string().min(2, {
      message: "title must be at least 2 characters.",
    }),
    content: z.string().min(12, {
      message: "Content should be atleast 12 characters.",
    }),
  });
export function SheetDemo() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const res = await fetch('/api/onlypost', {
            method: 'POST',
            body: JSON.stringify(values),
    })
    form.reset();
    router.refresh()
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" ">
        <Sheet >
          <SheetTrigger asChild>
            <Button className="text-lg font-medium" variant="default">Post</Button>
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <SheetHeader>
              <SheetTitle className="text-2xl">Make new note</SheetTitle>
              <SheetDescription className="text-lg">
                Post something to your profile here. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right text-lg">
                          Heading
                        </Label>
                        <Input placeholder="yo guys" className="col-span-3 text-lg" {...field} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right text-lg">
                          Content
                        </Label>
                        <Textarea id="s" placeholder="type your message" className="col-span-3 resize-none text-lg" {...field} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <form><Button type="submit" className="text-lg" >Save changes</Button></form>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </form>
    </Form>
  )
}

