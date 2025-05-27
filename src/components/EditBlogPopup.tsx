import "../styles/global.css";

import React, { useState, useEffect } from "react";
import { auth } from "../firebase/client";
import { onAuthStateChanged, User } from "firebase/auth";
import { updatePost } from "../lib/posts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

interface EditBlogPopupProps {
  id: string;
  initialTitle: string;
  initialContent: string;
  initialPhoto?: string;
  initialAuthor?: string;
  userId: string;
}

export default function EditBlogPopup({
  id,
  initialTitle,
  initialContent,
  initialPhoto = "",
  initialAuthor = "",
  userId,
}: EditBlogPopupProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);
  const isAuthorized = user?.uid === userId;
  // Only render edit popup if the current user is authorized
  if (!isAuthorized) {
    return null;
  }
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [photo, setPhoto] = useState(initialPhoto);
  const [author, setAuthor] = useState(initialAuthor);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedPost = { title, content, photo, author, userId };
    try {
      await updatePost(id, updatedPost);
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger disabled={!isAuthorized} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
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
            <DialogClose asChild>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
