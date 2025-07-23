'use client';

const LoginButton = () => {
  const handleLogin = () => {
    // Redirect to the backend Google auth route
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Login with Google
    </button>
  );
};

export default LoginButton;