"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

const MockClerkContext = createContext<any>(null);

export function ClerkProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>({
    id: "user_1",
    firstName: "Demo",
    lastName: "Learner",
    username: "demo_user",
    profileImageUrl: "",
  });
  const [isSignedIn, setIsSignedIn] = useState(true);

  return (
    <MockClerkContext.Provider value={{ user, setUser, isSignedIn, setIsSignedIn }}>
      {children}
    </MockClerkContext.Provider>
  );
}

export function useUser() {
  const context = useContext(MockClerkContext);
  return {
    isLoaded: true,
    isSignedIn: context?.isSignedIn ?? true,
    user: context?.user ?? null,
  };
}

export function useAuth() {
  const context = useContext(MockClerkContext);
  return {
    isLoaded: true,
    isSignedIn: context?.isSignedIn ?? true,
    userId: context?.isSignedIn ? "user_1" : null,
  };
}

export function useClerk() {
  const context = useContext(MockClerkContext);
  const router = useRouter();
  return {
    signOut: (callback?: () => void) => {
      if (context) {
        context.setIsSignedIn(false);
        context.setUser(null);
      }
      if (callback) callback();
      else router.push("/");
    },
    client: {},
  };
}

export function UserButton() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--duo-green)] text-white font-black uppercase text-sm select-none">
      {user.firstName ? user.firstName[0] : "U"}
    </div>
  );
}

export function SignIn({ signUpUrl, forceRedirectUrl }: any) {
  const context = useContext(MockClerkContext);
  const router = useRouter();
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (context) {
      context.setIsSignedIn(true);
      context.setUser({
        id: "user_1",
        firstName: "Demo",
        username: "demo_user",
      });
    }
    router.push(forceRedirectUrl || "/learn");
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-[360px] p-6 border-2 border-border rounded-2xl bg-card">
      <input type="text" placeholder="Username" defaultValue="demo_user" className="px-4 py-3 border-2 border-border rounded-xl font-bold bg-background text-foreground" required />
      <input type="password" placeholder="Password" defaultValue="password" className="px-4 py-3 border-2 border-border rounded-xl font-bold bg-background text-foreground" required />
      <button type="submit" className="py-3.5 px-6 bg-primary text-primary-foreground font-extrabold rounded-xl shadow-[0_4px_0_var(--primary-dark)] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider text-sm cursor-pointer">
        Sign In
      </button>
    </form>
  );
}

export function SignUp({ signInUrl, forceRedirectUrl }: any) {
  const context = useContext(MockClerkContext);
  const router = useRouter();
  const handleSignup = (e: any) => {
    e.preventDefault();
    if (context) {
      context.setIsSignedIn(true);
      context.setUser({
        id: "user_1",
        firstName: "New Learner",
        username: "new_learner",
      });
    }
    router.push(forceRedirectUrl || "/learn");
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full max-w-[360px] p-6 border-2 border-border rounded-2xl bg-card">
      <input type="text" placeholder="Username" defaultValue="new_learner" className="px-4 py-3 border-2 border-border rounded-xl font-bold bg-background text-foreground" required />
      <input type="email" placeholder="Email" defaultValue="demo@example.com" className="px-4 py-3 border-2 border-border rounded-xl font-bold bg-background text-foreground" required />
      <input type="password" placeholder="Password" defaultValue="password" className="px-4 py-3 border-2 border-border rounded-xl font-bold bg-background text-foreground" required />
      <button type="submit" className="py-3.5 px-6 bg-[var(--duo-green)] text-white font-extrabold rounded-xl shadow-[0_4px_0_var(--duo-green-dark)] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wider text-sm cursor-pointer">
        Create Account
      </button>
    </form>
  );
}
