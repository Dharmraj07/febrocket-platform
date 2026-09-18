"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Lock,
  Mail,
  Rocket,
  User,
  XCircle,
} from "lucide-react";
import { api, safeAuthError } from "@/lib/api";

export default function SignUp() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (userName.trim().length < 3) {
      setError("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/auth/register", {
        email: email.trim(),
        password,
        userName: userName.trim(),
      });

      const data = response.data || {};

      if (data.success) {
        const message =
          data.message ||
          "Registration successful. Please check your email to verify your account.";

        setSuccess(message);
        setLoading(false);

        setTimeout(() => {
          router.push("/signin");
        }, 2000);

        return;
      }

      setError(data.message || "Registration failed.");
      setLoading(false);
    } catch (err) {
      console.error("Registration error:", err);
      setError(safeAuthError(err, "Registration failed. Please check your information."));
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl border border-green-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-50">
                <CheckCircle
                  size={28}
                  className="text-green-600"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-green-700">
                  Registration Successful
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {success}
                </p>
              </div>
            </div>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-green-100">
              <div className="h-full w-full origin-left animate-[shrink_2s_linear_forwards] bg-green-500" />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <Rocket size={19} />
            </div>

            <span className="text-xl font-bold">
              FebRocket
            </span>
          </Link>

          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Signup */}
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">

            {/* Heading */}
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Rocket size={25} />
              </div>

              <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
                Create your account
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Start your journey with FebRocket
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                <XCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Username */}
              <div>
                <label
                  htmlFor="userName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Username
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="userName"
                    type="text"
                    value={userName}
                    onChange={(event) =>
                      setUserName(event.target.value)
                    }
                    placeholder="Choose a username"
                    required
                    minLength={3}
                    maxLength={30}
                    autoComplete="username"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />
                </div>
              </div>

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
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Create a password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-20 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 transition hover:text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Password must contain at least 8 characters.
                </p>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 text-sm text-slate-500">
                <input
                  type="checkbox"
                  required
                  disabled={loading}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600"
                />

                <span>
                  I agree to{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || success}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account

                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs text-slate-400">
                ALREADY REGISTERED?
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Sign In */}
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-semibold text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            Your information is handled according to our{" "}
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

      {/* Animation */}
      <style jsx global>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </main>
  );
}