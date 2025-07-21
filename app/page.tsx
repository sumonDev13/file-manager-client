// app/page.tsx
'use client';
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold my-8">Welcome to the Authentication Demo</h1>
      {user ? (
        <p className="text-xl">You are logged in as {user.displayName}.</p>
      ) : (
        <p className="text-xl">Please log in to access the dashboard.</p>
      )}
    </div>
  );
}