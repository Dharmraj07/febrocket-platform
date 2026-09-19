"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  Rocket,
} from "lucide-react";
import { api, safeAuthError, setStoredUser } from "@/lib/api";

const GOOGLE_AUTH_URL =
  "https://febrocket-auth-service.onrender.com/api/auth/google";

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email: email.trim(),
        password,
      });

      const data = response.data || {};
      const user = data.user || { email: email.trim() };

      if (data.success || user) {
        setStoredUser(user);
        router.push("/dashboard");
        return;
      }

      setError(data.message || "Login failed");
    } catch (err) {
      console.error("Login error:", err);
      setError(safeAuthError(err, "Invalid email or password."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError("");
    setGoogleLoading(true);

    // Start Google OAuth.
    // Google will eventually redirect to your backend callback.
    window.location.href = GOOGLE_AUTH_URL;
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <Rocket size={19} />
            </div>

            <span className="text-xl font-bold">FebRocket</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Sign In */}
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
            {/* Heading */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Lock size={25} />
              </div>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Sign in to continue to FebRocket
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading || googleLoading}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:shadow disabled:cursor-not-allowed disabled:opacity-70"
            >
              {googleLoading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
                  Connecting to Google...
                </>
              ) : (
                <>
                  {/* Google Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.39Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.5A9.75 9.75 0 0 0 12 21.75Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M6.54 13.85A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.85v-2.5H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.35l3.24-2.5Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 6.12c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.22 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.4l3.24 2.5C7.31 7.84 9.46 6.12 12 6.12Z"
                    />
                  </svg>

                  Continue with Google
                </>
              )}
            </button>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400">
                OR CONTINUE WITH EMAIL
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    disabled={loading || googleLoading}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    disabled={loading || googleLoading}
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading || googleLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Signup */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-blue-600 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-blue-600 hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-blue-600 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Lock,
//   Mail,
//   Rocket,
// } from "lucide-react";
// import { api, safeAuthError, setStoredUser } from "@/lib/api";

// export default function SignIn() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     setError("");
//     setLoading(true);

//     try {
//       const response = await api.post("/api/auth/login", {
//         email: email.trim(),
//         password,
//       });

//       const data = response.data || {};
//       const user = data.user || { email: email.trim() };

//       if (data.success || user) {
//         setStoredUser(user);
//         router.push("/dashboard");
//         return;
//       }

//       setError(data.message || "Login failed");
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(safeAuthError(err, "Invalid email or password."));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-50">
//       {/* Header */}
//       <header className="border-b border-slate-200 bg-white">
//         <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-2">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
//               <Rocket size={19} />
//             </div>

//             <span className="text-xl font-bold">FebRocket</span>
//           </Link>

//           {/* Back */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
//           >
//             <ArrowLeft size={16} />
//             Back to Home
//           </Link>
//         </div>
//       </header>

//       {/* Sign In */}
//       <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
//         <div className="w-full max-w-md">
//           <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
//             {/* Heading */}
//             <div className="text-center">
//               <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
//                 <Lock size={25} />
//               </div>

//               <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
//                 Welcome back
//               </h1>

//               <p className="mt-2 text-sm text-slate-500">
//                 Sign in to continue to FebRocket
//               </p>
//             </div>

//             {/* Error */}
//             {error && (
//               <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
//                 {error}
//               </div>
//             )}

//             {/* Form */}
//             <form
//               onSubmit={handleSubmit}
//               className="mt-8 space-y-5"
//             >
//               {/* Email */}
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="mb-2 block text-sm font-semibold text-slate-700"
//                 >
//                   Email
//                 </label>

//                 <div className="relative">
//                   <Mail
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                   />

//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(event) =>
//                       setEmail(event.target.value)
//                     }
//                     placeholder="you@example.com"
//                     required
//                     autoComplete="email"
//                     disabled={loading}
//                     className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <div className="mb-2 flex items-center justify-between">
//                   <label
//                     htmlFor="password"
//                     className="text-sm font-semibold text-slate-700"
//                   >
//                     Password
//                   </label>

//                   <Link
//                     href="/forgot-password"
//                     className="text-sm font-semibold text-blue-600 hover:underline"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>

//                 <div className="relative">
//                   <Lock
//                     size={18}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                   />

//                   <input
//                     id="password"
//                     type={
//                       showPassword ? "text" : "password"
//                     }
//                     value={password}
//                     onChange={(event) =>
//                       setPassword(event.target.value)
//                     }
//                     placeholder="Enter your password"
//                     required
//                     autoComplete="current-password"
//                     disabled={loading}
//                     className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
//                   />

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowPassword(!showPassword)
//                     }
//                     disabled={loading}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-blue-600"
//                   >
//                     {showPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
//               >
//                 {loading ? (
//                   <>
//                     <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
//                     Signing In...
//                   </>
//                 ) : (
//                   <>
//                     Sign In

//                     <ArrowRight
//                       size={18}
//                       className="transition group-hover:translate-x-1"
//                     />
//                   </>
//                 )}
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="my-7 flex items-center gap-4">
//               <div className="h-px flex-1 bg-slate-200" />

//               <span className="text-xs text-slate-400">
//                 SECURE LOGIN
//               </span>

//               <div className="h-px flex-1 bg-slate-200" />
//             </div>

//             {/* Signup */}
//             <p className="text-center text-sm text-slate-500">
//               Don't have an account?{" "}
//               <Link
//                 href="/signup"
//                 className="font-semibold text-blue-600 hover:underline"
//               >
//                 Create account
//               </Link>
//             </p>
//           </div>

//           {/* Footer */}
//           <p className="mt-6 text-center text-xs text-slate-400">
//             By signing in, you agree to our{" "}
//             <Link
//               href="/terms"
//               className="hover:text-blue-600 hover:underline"
//             >
//               Terms
//             </Link>{" "}
//             and{" "}
//             <Link
//               href="/privacy"
//               className="hover:text-blue-600 hover:underline"
//             >
//               Privacy Policy
//             </Link>
//             .
//           </p>
//         </div>
//       </section>
//     </main>
//   );
// }
