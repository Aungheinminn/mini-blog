import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../firebase/client";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Avatar, AvatarFallback } from "./ui/avatar";

/**
 * UserPopover shows the current user's email and a sign-out button in a popover.
 * Triggered by an avatar displaying the user's initials (first two words of email).
 */
export default function UserPopover() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsubscribe;
  }, []);

  if (!user?.email) return null;

  // Extract initials from email username: first two words or first two letters
  const username = user.email.split("@")[0];
  const words = username.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  let initials = "";
  if (words.length >= 2) {
    initials = (words[0][0] + words[1][0]).toUpperCase();
  } else if (words.length === 1) {
    initials = words[0].slice(0, 2).toUpperCase();
  }

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button aria-label="User menu" className="cursor-pointer">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <span className="text-sm text-gray-700 truncate">{user.email}</span>
        <button
          onClick={handleSignOut}
          className="w-full text-left px-2 py-1 text-red-600 hover:bg-red-50 rounded"
        >
          Sign Out
        </button>
      </PopoverContent>
    </Popover>
  );
}

