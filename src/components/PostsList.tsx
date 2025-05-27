import React, { useEffect, useState } from "react";
import { getPosts, getMyPosts, Post } from "../lib/posts";
import { auth } from "../firebase/client";
import { onAuthStateChanged, User } from "firebase/auth";

interface PostsListProps {
  /** If true, filters posts by current user's UID */
  filterByUser?: boolean;
}

export default function PostsList({ filterByUser = false }: PostsListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // Load posts whenever filter flag or auth user changes
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (filterByUser) {
          if (user) {
            const userPosts = await getMyPosts(user.uid);
            setPosts(userPosts);
          } else {
            setPosts([]);
          }
        } else {
          const allPosts = await getPosts();
          setPosts(allPosts);
        }
      } catch (err: any) {
        console.error("Failed to load posts", err);
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filterByUser, user]);

  if (loading) {
    return <p>Loading posts...</p>;
  }
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <a href={`/blog/${post.id}`} key={post.id} className="block">
          <div className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow">
            {post.photo && (
              <img
                src={post.photo}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 truncate">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>
              {post.author && (
                <p className="text-gray-500 text-sm text-right">
                  By {post.author}
                </p>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

