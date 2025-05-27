import "../styles/global.css";

import React, { useState, useEffect } from "react";
import { auth } from "../firebase/client";
import { onAuthStateChanged, User } from "firebase/auth";
import { deletePost } from "../lib/posts";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

interface DeleteBlogPopupProps {
  id: string;
  userId: string;
}

export default function DeleteBlogPopup({ id, userId }: DeleteBlogPopupProps) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);
  const isAuthorized = user?.uid === userId;
  // Only render delete popup if the current user is authorized
  if (!isAuthorized) {
    return null;
  }
  const handleDelete = async () => {
    try {
      await deletePost(id);
      window.location.href = "/blogs";
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger disabled={!isAuthorized} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Blog</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this blog post? This action cannot be undone.
        </DialogDescription>
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
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}