import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import CreateBlogPopup from "./CreateBlogPopup";

export default function BurgerMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="burger" type="button">
          <MenuIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>
      <SheetContent className="bg-slate-300" side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 p-4">
          <a href="/">Home</a>
          <a href="/blogs">Blogs</a>
          <a href="/my-blogs">My Blogs</a>
          <CreateBlogPopup />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

