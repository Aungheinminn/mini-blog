import "../styles/global.css";

import React, { useEffect, useState } from "react";
import { auth } from "../firebase/client";
import { createPost } from "../lib/posts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { onAuthStateChanged, User } from "firebase/auth";

export default function CreateBlogPopup() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      window.location.href = "/signin";
      return;
    }
    setError("");
    setLoading(true);
    try {
      await createPost({ title, content, photo, author, userId: user.uid });
      window.location.reload();
    } catch (err: any) {
      console.error("Error creating blog:", err);
      setError(err.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
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
          {error && <p className="text-red-600">{error}</p>}
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
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
