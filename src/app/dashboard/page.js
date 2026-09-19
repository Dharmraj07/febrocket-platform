
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  LogOut,
  Rocket,
  ShieldCheck,
  Sparkles,
  User,
  Upload,
  Zap,
} from "lucide-react";
import {
  api,
  clearStoredUser,
  setStoredUser,
} from "@/lib/api";

export default function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const response = await api.get("/api/auth/me", {
          withCredentials: true,
        });

        const payload = response.data || {};

        const authenticatedUser =
          payload.user || null;

        if (!authenticatedUser) {
          throw new Error("Authenticated user was not returned.");
        }

        if (!mounted) {
          return;
        }

        setUser(authenticatedUser);
        setStoredUser(authenticatedUser);
      } catch (error) {
        console.error("Dashboard authentication failed:", error);

        if (!mounted) {
          return;
        }

        clearStoredUser();
        router.replace("/signin");
      } finally {
        if (mounted) {
          setAuthLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await api.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.warn("Logout request failed:", error);
    } finally {
      clearStoredUser();
      setUser(null);
      router.replace("/signin");
    }
  };

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const userName =
    user.userName ||
    user.name ||
    user.email ||
    "User";

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <Rocket size={19} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              FebRocket
            </span>
          </Link>

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-2 rounded-xl bg-slate-50 px-4 py-2.5 sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <User size={15} />
              </div>

              <span className="max-w-[150px] truncate text-sm font-semibold text-slate-700">
                {userName}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={17} />
              <span className="hidden sm:inline">
                Log Out
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">

        {/* Launch Banner */}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
          <Sparkles
            size={20}
            className="shrink-0 text-blue-600"
          />

          <div>
            <p className="text-sm font-bold text-blue-700">
              FebRocket is launching soon 🚀
            </p>

            <p className="mt-0.5 text-sm text-blue-600">
              We're building an AI agent that helps you fill forms faster.
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 px-8 py-12 text-white shadow-2xl shadow-blue-500/20 sm:px-12 sm:py-16">

          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

          <div className="relative max-w-4xl">

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles size={28} />
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
              The future of form filling
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to the future of paperwork,{" "}
              <span className="text-blue-100">
                {userName}.
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100 sm:text-xl">
              FebRocket is building an AI agent that helps you fill
              online forms using the information already inside your
              documents.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-600 shadow-lg">
              <Rocket size={17} />
              Launching Soon
            </div>

          </div>
        </div>

        {/* What is FebRocket */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Zap size={24} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
              An AI agent for your forms
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Today, filling an online form often means typing the same
              information again and again, searching for documents,
              compressing files, resizing images, and dealing with
              upload limits.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              <span className="font-semibold text-slate-900">
                FebRocket is designed to handle that repetitive work for you.
              </span>
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Upload your documents once. Our AI extracts the relevant
              information and helps fill your online forms through the
              FebRocket browser extension.
            </p>

          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

            <h2 className="text-2xl font-extrabold tracking-tight">
              How FebRocket works
            </h2>

            <div className="mt-7 space-y-6">

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Upload size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    1. Upload your documents
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Upload your Aadhaar, certificates, marksheets,
                    resume, and other important documents.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Sparkles size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    2. AI understands your documents
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    FebRocket extracts the information you need,
                    so you don't have to type it repeatedly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Zap size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    3. Let AI fill the form
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Use the FebRocket browser extension to help fill
                    online forms on your behalf.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  <CheckCircle size={19} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    4. You review and submit
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Review the completed form yourself before it is
                    submitted. You stay in control.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pain Point */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">

          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Less hassle
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
              Stop doing the same paperwork again and again.
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Filling forms manually can be frustrating. You may need
              to repeatedly enter your name, address, date of birth,
              education details and other information.
            </p>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Then comes the document hassle — finding the right file,
              converting it, compressing it, resizing it and trying
              again when the upload limit is too small.
            </p>

            <p className="mt-4 text-lg font-semibold leading-7 text-slate-900">
              FebRocket is being built to take that repetitive work
              off your hands.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {[
              ["Less typing", "Reuse information from your documents."],
              ["Less document hassle", "Reduce repetitive file preparation."],
              ["AI-powered", "Let AI handle repetitive form work."],
              ["You're in control", "Review before submitting."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl bg-slate-50 p-5"
              >
                <CheckCircle
                  size={21}
                  className="text-green-600"
                />

                <p className="mt-3 font-semibold text-slate-900">
                  {title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {description}
                </p>
              </div>
            ))}

          </div>
        </div>

        {/* Launch CTA */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 px-8 py-10 text-center sm:px-12">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
            <Rocket size={27} />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            We're launching soon 🚀
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            We're working to make online form filling faster,
            simpler, and less frustrating. Soon, you will be able
            to upload your documents, let AI do the repetitive work,
            review the result, and submit.
          </p>

          <p className="mt-6 text-lg font-bold text-blue-600">
            Upload once. Fill faster. Review. Submit.
          </p>

        </div>

        {/* Account Information */}
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Account Information
              </h2>

              <p className="text-sm text-slate-500">
                Your FebRocket account
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Name
              </p>

              <p className="mt-2 font-semibold text-slate-900">
                {user.userName || user.name || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="mt-2 break-all font-semibold text-slate-900">
                {user.email || "—"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Type
              </p>

              <p className="mt-2 font-semibold capitalize text-slate-900">
                {user.role || "user"}
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-400">
            FebRocket — AI-powered form filling
          </p>
        </div>

      </section>
    </main>
  );
}
