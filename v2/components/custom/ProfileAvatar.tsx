'use client';

import * as React from 'react';
import Link from 'next/link';
import { Avatar } from '@/components/retroui/Avatar';
import { Popover } from '@/components/retroui/Popover';

// 🔐 Replace with real auth hook later
const useAuth = () => {
  return {
    isSignedIn: true,
    user: {
      name: '69k',
      avatarUrl: '/avatar.webp',
    },
  };
};

export function ProfileAvatar() {
  const { isSignedIn, user } = useAuth();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <button
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-700"
          aria-label="User menu"
        >
          <Avatar className="h-9 w-9 border-neutral-700 hover:border-neutral-500 transition">
            {isSignedIn && user?.avatarUrl ? (
              <Avatar.Image src={user.avatarUrl} alt={user.name} />
            ) : null}
            <Avatar.Fallback>
              {isSignedIn ? user?.name?.slice(0, 2).toUpperCase() : '🔒'}
            </Avatar.Fallback>
          </Avatar>
        </button>
      </Popover.Trigger>

      <Popover.Content
        align="end"
        sideOffset={8}
        className="w-48 rounded-md border-neutral-800 bg-black text-sm"
      >
        {isSignedIn ? <SignedInMenu /> : <SignedOutMenu />}
      </Popover.Content>
    </Popover>
  );
}
function MenuItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded px-2 py-1.5 text-neutral-300 hover:bg-neutral-900 hover:text-white"
    >
      {children}
    </Link>
  );
}
// TODO REPLACE WITH REAL AUTH
function SignedInMenu() {
  return (
    <div className="flex flex-col gap-1">
      <MenuItem href="/profile">Profile</MenuItem>
      <MenuItem href="/settings">Settings</MenuItem>

      <div className="my-1 h-px bg-neutral-800" />

      <button className="rounded px-2 py-1.5 text-left text-red-400 hover:bg-neutral-900">
        Log out
      </button>
    </div>
  );
}

function SignedOutMenu() {
  return (
    <div className="flex flex-col gap-1">
      <MenuItem href="/signin">Sign in</MenuItem>
      <MenuItem href="/signup">Sign up</MenuItem>
    </div>
  );
}
