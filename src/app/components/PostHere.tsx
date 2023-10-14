import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
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
import { Textarea } from "./ui/textarea"
export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Post</Button>
      </SheetTrigger>
      <SheetContent  side={"bottom"}>
        <SheetHeader>
          <SheetTitle className="text-2xl">Make new note</SheetTitle>
          <SheetDescription className="text-lg">
            Post something to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-lg">
              Heading
            </Label>
            <Input id="name" placeholder="yo guys" className="col-span-3 text-lg" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right text-lg">
              Content
            </Label>
            {/* <Input id="username" placeholder="I'm doing good" className="col-span-3" /> */}
            <Textarea placeholder="type your message" className="col-span-3 resize-none text-lg"/>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" className="text-lg">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

