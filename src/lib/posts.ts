import { db } from "../firebase/client";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  photo?: string;
  author?: string;
  createdAt?: any;
  updatedAt?: any;
  /** ID of user who created the post */
}

export interface NewPost {
  title: string;
  content: string;
  photo: string;
  author: string;
  /** UID of the user creating the post */
  userId: string;
}

const postsCollection = collection(db, "posts");

export async function createPost(data: NewPost): Promise<string> {
  const { title, content, photo, author, userId } = data;
  const docRef = await addDoc(postsCollection, {
    title,
    content,
    photo: photo || null,
    author: author || null,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Fetch posts, optionally filtered by userId.
 * @param userId If provided, only posts with matching userId are returned.
 */
/**
 * Fetch all posts.
 */
export async function getPosts(): Promise<Post[]> {
  const snapshot = await getDocs(postsCollection);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as any),
  }));
}

/**
 * Fetch posts belonging to a specific user.
 * @param userId UID of the user whose posts to retrieve.
 */
export async function getMyPosts(userId: string): Promise<Post[]> {
  const q = query(postsCollection, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as any),
  }));
}

export async function getPost(id: string): Promise<Post | null> {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  console.log(docSnap);
  return {
    id: docSnap.id,
    ...(docSnap.data() as any),
  };
}

export async function updatePost(id: string, data: NewPost): Promise<void> {
  const docRef = doc(db, "posts", id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id: string): Promise<void> {
  const docRef = doc(db, "posts", id);
  await deleteDoc(docRef);
}
