// components/auth/GoogleButton.tsx
'use client';
import { useAuth } from "@/contexts/AuthContext";
export default function GoogleButton() {
  const { loginWithGoogle, loading } = useAuth();

  return (
    <button
      onClick={loginWithGoogle}
      disabled={loading}
      className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 ${
        loading ? 'bg-gray-300' : 'bg-white hover:bg-gray-50'
      }`}
    >
      {loading ? (
        'Loading...'
      ) : (
        <>
          {/* <GoogleIcon /> */}
          Continue with Google
        </>
      )}
    </button>
  );
}