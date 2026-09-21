"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  FileText,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Upload,
  UserCheck,
  Zap,
} from "lucide-react";
import { api, isUserPayloadValid, setStoredUser } from "@/lib/api";

const GOOGLE_AUTH_URL =
  "https://backend.febrocket.com/api/auth/google";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const response = await api.get("/api/auth/me", {
          withCredentials: true,
        });
        const payload = response.data || {};
        const authenticatedUser =
          payload.user || payload.data?.user || payload;

        if (!isUserPayloadValid(authenticatedUser)) {
          throw new Error("Authenticated user was not returned.");
        }

        if (mounted) {
          setUser(authenticatedUser);
          setStoredUser(authenticatedUser);
          router.replace("/dashboard");
        }
      } catch {
        if (mounted) {
          setAuthChecked(true);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [router]);

  const handleGoogleLogin = () => {
    window.location.assign(GOOGLE_AUTH_URL);
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-8">

          <a
            href="/"
            className="group flex items-center gap-4"
            aria-label="FebRocket Home"
          >
            <img
              src="/febrocket-logo7.png"
              alt="FebRocket"
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-16"
            />

            <span className="hidden border-l border-slate-200 pl-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 sm:block">
              Future Forward
            </span>
          </a>

        </div>
      </header>


      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-50/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

          {/* Hero Content */}
          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <Sparkles size={15} />
              AI-POWERED FORM FILLING
            </div>


            {/* Heading */}
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Stop filling forms
              <br />

              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                manually.
              </span>
            </h1>


            {/* Description */}
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Meet FebRocket — an AI agent that understands your
              documents and helps fill online forms for you.
              Upload your documents once, let AI handle the
              repetitive work, review the form, and submit.
            </p>


            {/* Google Authentication */}
            <div className="mt-9">

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={!authChecked}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-slate-50 hover:shadow-xl sm:w-auto"
              >

                <GoogleIcon />

                {authChecked ? "Continue with Google" : "Checking session..."}

                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />

              </button>

              <p className="mt-3 text-sm text-slate-400">
                Secure sign-in with your Google account
              </p>

            </div>


            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">

              <TrustPoint text="AI-powered" />

              <TrustPoint text="Review before submit" />

              <TrustPoint text="Secure & private" />

            </div>

          </div>


          {/* =================================================
              AI AGENT IMAGE
          ================================================== */}
          <div className="relative">

            {/* Glow */}
            <div className="absolute inset-10 rounded-full bg-blue-200/40 blur-3xl" />

            <div className="relative">

              <img
                src="/febrocket-ai-agent.png"
                alt="FebRocket AI agent filling an online form"
                className="relative w-full rounded-3xl shadow-2xl shadow-blue-900/10"
              />

            </div>

            {/* Floating label */}
            <div className="absolute -bottom-5 right-4 rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-lg">
              Upload. Fill. Review. Submit.
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section
        id="how-it-works"
        className="border-y border-slate-100 bg-white py-24"
      >

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="Let AI handle the repetitive work."
            description="You provide the documents. FebRocket does the repetitive form-filling work. You review the result before anything is submitted."
          />


          <div className="mt-16 grid gap-12 md:grid-cols-4">

            <Step
              number="01"
              icon={<Upload size={25} />}
              title="Upload"
              description="Upload your important documents once."
            />

            <Step
              number="02"
              icon={<Sparkles size={25} />}
              title="AI Extracts"
              description="AI reads your documents and extracts the information needed for forms."
            />

            <Step
              number="03"
              icon={<Zap size={25} />}
              title="AI Fills"
              description="FebRocket helps fill online forms using your information through the browser extension."
            />

            <Step
              number="04"
              icon={<UserCheck size={25} />}
              title="Review"
              description="Check the completed form yourself before submitting it."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section
        id="features"
        className="bg-gradient-to-b from-slate-50 to-white py-24"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <SectionHeading
            eyebrow="THE FEBROCKET AGENT"
            title="Your paperwork assistant."
            description="Built to remove the repetitive parts of filling online forms."
          />


          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon={<Sparkles size={25} />}
              title="AI Document Understanding"
              description="Extract useful information from your documents without manually typing everything."
            />

            <FeatureCard
              icon={<Zap size={25} />}
              title="AI Form Filling"
              description="Use the FebRocket browser extension to help complete online forms faster."
            />

            <FeatureCard
              icon={<FileText size={25} />}
              title="Document Management"
              description="Keep the documents you frequently need for applications organized in one place."
            />

            <FeatureCard
              icon={<ShieldCheck size={25} />}
              title="Human Review"
              description="AI does the repetitive work, but you review the form before submission."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ====================================================== */}
      <section id="about" className="py-24">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Left */}
            <div>

              <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
                WHY FEBROCKET?
              </span>


              <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Paperwork shouldn't take hours.
              </h2>


              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Filling online forms often means repeatedly typing
                the same information, searching for documents,
                compressing PDFs, resizing images and dealing with
                upload limits.
              </p>


              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                FebRocket is being built to take that repetitive
                work off your hands.
              </p>


              <div className="mt-8 space-y-4">

                <Bullet text="Upload your documents once." />

                <Bullet text="Let AI extract the information." />

                <Bullet text="Fill forms with the browser extension." />

                <Bullet text="Review everything before submission." />

              </div>

            </div>


            {/* Right */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">

              <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
                TODAY
              </p>


              <div className="mt-5 space-y-3">

                <ProblemItem text="Find the right document" />

                <ProblemItem text="Type the same information again" />

                <ProblemItem text="Compress the PDF" />

                <ProblemItem text="Resize the image" />

                <ProblemItem text="Upload and try again" />

              </div>


              <div className="my-8 h-px bg-slate-100" />


              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                WITH FEBROCKET
              </p>


              <div className="mt-5 space-y-3">

                <SolutionItem text="Upload your documents" />

                <SolutionItem text="AI extracts your information" />

                <SolutionItem text="AI helps fill the form" />

                <SolutionItem text="You review and submit" />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="px-6 pb-24 lg:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-8 py-16 text-center text-white shadow-2xl shadow-blue-500/20 sm:px-16">

          <div className="mx-auto max-w-2xl">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Rocket size={27} />
            </div>


            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
              FUTURE FORWARD
            </p>


            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Your AI agent for forms is coming.
            </h2>


            <p className="mt-5 text-lg leading-8 text-blue-100">
              We're building FebRocket to make online form filling
              faster and less frustrating. Upload your documents,
              let AI do the repetitive work, review the result,
              and submit.
            </p>


            {/* Google CTA */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={!authChecked}
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-bold text-blue-600 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
            >

              <GoogleIcon />

              {authChecked ? "Sign In" : "Checking session..."}

              <ArrowRight size={17} />

            </button>


            <p className="mt-5 text-sm font-semibold text-blue-100">
              Upload once. Fill faster. Review. Submit.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer
        id="contact"
        className="border-t border-slate-100 bg-white"
      >

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            {/* Brand */}
            <div>

              <a
                href="/"
                className="group inline-flex items-center"
                aria-label="FebRocket Home"
              >
                <img
                  src="/febrocket-logo7.png"
                  alt="FebRocket"
                  className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-14"
                />
              </a>


              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
                An AI agent that helps you fill forms faster.
              </p>

            </div>


            {/* Product */}
            <div>

              <h3 className="font-semibold">
                Product
              </h3>


              <div className="mt-4 space-y-3 text-sm text-slate-500">

                <a
                  href="#features"
                  className="block transition hover:text-blue-600"
                >
                  Features
                </a>


                <a
                  href="#how-it-works"
                  className="block transition hover:text-blue-600"
                >
                  How It Works
                </a>


                <a
                  href="#about"
                  className="block transition hover:text-blue-600"
                >
                  About
                </a>

              </div>

            </div>


            {/* Company */}
            <div>

              <h3 className="font-semibold">
                Company
              </h3>


              <div className="mt-4 space-y-3 text-sm text-slate-500">

                <a
                  href="mailto:hello@febrocket.com"
                  className="block transition hover:text-blue-600"
                >
                  hello@febrocket.com
                </a>


                <a
                  href="tel:+919835373057"
                  className="block transition hover:text-blue-600"
                >
                  +91 98353 73057
                </a>


                <a
                  href="/contact"
                  className="block transition hover:text-blue-600"
                >
                  Contact
                </a>

              </div>

            </div>


            {/* Legal */}
            <div>

              <h3 className="font-semibold">
                Legal
              </h3>


              <div className="mt-4 space-y-3 text-sm text-slate-500">

                <a
                  href="/privacy"
                  className="block transition hover:text-blue-600"
                >
                  Privacy Policy
                </a>


                <a
                  href="/terms"
                  className="block transition hover:text-blue-600"
                >
                  Terms of Service
                </a>


                <a
                  href="/data-deletion"
                  className="block transition hover:text-blue-600"
                >
                  Data Deletion
                </a>

              </div>

            </div>

          </div>


          {/* Copyright */}
          <div className="mt-12 flex flex-col gap-4 border-t border-slate-100 pt-7 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 FebRocket. All rights reserved.
            </p>


            <p>
              Future Forward
            </p>

          </div>

        </div>

      </footer>

    </main>
  );
}


/* =========================================================
   GOOGLE ICON
========================================================= */

function GoogleIcon() {
  return (
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
  );
}


/* =========================================================
   TRUST POINT
========================================================= */

function TrustPoint({ text }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">

      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Check size={13} strokeWidth={3} />
      </div>

      {text}

    </div>
  );
}


/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
        {eyebrow}
      </span>


      <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h2>


      <p className="mt-5 text-lg leading-8 text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   STEP
========================================================= */

function Step({
  number,
  icon,
  title,
  description,
}) {
  return (
    <div className="text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        {icon}
      </div>


      <p className="mt-5 text-sm font-bold text-blue-600">
        {number}
      </p>


      <h3 className="mt-1 text-xl font-bold">
        {title}
      </h3>


      <p className="mx-auto mt-3 max-w-xs leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-900/5">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>


      <h3 className="mt-6 text-lg font-bold">
        {title}
      </h3>


      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   BULLET
========================================================= */

function Bullet({ text }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <Check size={14} strokeWidth={3} />
      </div>


      <span className="text-slate-600">
        {text}
      </span>

    </div>
  );
}


/* =========================================================
   PROBLEM ITEM
========================================================= */

function ProblemItem({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">

      <div className="h-2 w-2 rounded-full bg-slate-300" />


      <span className="text-sm text-slate-600">
        {text}
      </span>

    </div>
  );
}


/* =========================================================
   SOLUTION ITEM
========================================================= */

function SolutionItem({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3">

      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
        <Check size={12} strokeWidth={3} />
      </div>


      <span className="text-sm font-medium text-blue-700">
        {text}
      </span>

    </div>
  );
}