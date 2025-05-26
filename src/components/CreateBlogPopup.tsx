import "../styles/global.css";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

export default function CreateBlogPopup() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = { title, content, photo, author };
    console.log("CreateBlog:", newPost);
    // TODO: integrate creation logic
  };

  return (
    <Dialog>
      <DialogTrigger className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Create Blog
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Blog</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-1">
            <label htmlFor="blog-title" className="font-medium">
              Title
            </label>
            <input
              id="blog-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="blog-content" className="font-medium">
              Content
            </label>
            <textarea
              id="blog-content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 h-24"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="blog-photo" className="font-medium">
              Photo URL
            </label>
            <input
              id="blog-photo"
              type="url"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="blog-author" className="font-medium">
              Author
            </label>
            <input
              id="blog-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
