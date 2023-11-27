import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginBtn() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignInGoogle = (e) => {
    e.preventDefault();
    signIn("google");
  };
  
  const handleSignInGithub = (e) => {
    e.preventDefault();
    signIn("github");
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
  };

  if (session) {
    if (router.pathname === "/login") {
      window.location.href = "http://localhost:3000"; // despues lo tengo que cambiar por la url posta
      return null; 
    }

    return (
      <button
        type="button"
        onClick={handleSignOut}
        className="w-full px-4 py-2 flex items-center justify-center text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
      >
        Sign Out
      </button>
    );
  }

  return (
    <>
      <div className="mt-6">
        <button
          type="button"
          onClick={handleSignInGoogle}
          className="w-full px-4 py-2 flex items-center justify-center text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none">
          Sign In with Google
        </button>
      </div>
      
      <div className="mt-6">
        <button 
          type="button"
          onClick={handleSignInGithub}
          className="w-full px-4 py-2 flex items-center justify-center text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none">
          Sign In with Github
        </button>
    </div>
  </>
  );
}
