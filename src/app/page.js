"use client";

import {
  ArrowRight,
  Check,
  FileText,
  Menu,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Upload,
  UserCheck,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          <a href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
              <Rocket size={20} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              FebRocket
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              How It Works
            </a>

            <a
              href="#features"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Features
            </a>

            <a
              href="#about"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
            >
              Contact
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="/signin"
              className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Sign In
            </a>

            <a
              href="/signup"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Get Started
            </a>
          </div>

          <button
            className="rounded-lg p-2 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-50/70 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

          <div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              <Sparkles size={15} />
              AI-POWERED FORM FILLING
            </div>

            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Stop filling forms
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                manually.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Meet FebRocket — an AI agent that understands your
              documents and helps fill online forms for you.
              Upload your documents once, let AI handle the
              repetitive work, review the form, and submit.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="/signup"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-4 font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:-translate-y-1"
              >
                Get Started
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <Play size={17} />
                See How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              <TrustPoint text="AI-powered" />
              <TrustPoint text="Review before submit" />
              <TrustPoint text="Secure & private" />
            </div>

          </div>

          {/* Product Preview */}
          <div className="relative">

            <div className="absolute inset-10 rounded-full bg-blue-200/40 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-blue-900/10">

              <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                <div className="h-3 w-3 rounded-full bg-slate-200" />
                <div className="h-3 w-3 rounded-full bg-slate-200" />
                <div className="h-3 w-3 rounded-full bg-slate-200" />

                <div className="ml-4 flex-1 rounded-lg bg-slate-50 px-4 py-2 text-xs text-slate-400">
                  government-form.example
                </div>
              </div>

              <div className="p-6 sm:p-8">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      FEBROCKET AI AGENT
                    </p>

                    <h3 className="mt-1 text-xl font-bold">
                      Filling your form
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Sparkles size={19} />
                  </div>
                </div>

                <div className="mt-7">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">
                      Form completion
                    </span>

                    <span className="font-bold text-blue-600">
                      82%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  <PreviewField
                    label="Full Name"
                    value="Dharmraj Hembram"
                    completed
                  />

                  <PreviewField
                    label="Date of Birth"
                    value="•• / •• / ••••"
                    completed
                  />

                  <PreviewField
                    label="Address"
                    value="Information extracted from document"
                    completed
                  />

                  <PreviewField
                    label="Document Upload"
                    value="Aadhaar.pdf"
                    completed
                  />
                </div>

                <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600">
                      <Sparkles size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-blue-700">
                        AI agent is filling your form
                      </p>

                      <p className="mt-0.5 text-xs text-blue-600">
                        Review everything before submission.
                      </p>
                    </div>
                  </div>
                </div>

                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white">
                  Review Form
                  <ArrowRight size={16} />
                </button>

              </div>
            </div>

            <div className="absolute -bottom-6 right-4 rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-semibold text-blue-600 shadow-lg">
              Upload. Fill. Review. Submit.
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
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

      {/* FEATURES */}
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

      {/* ABOUT */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-14 lg:grid-cols-2">

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

      {/* CTA */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-8 py-16 text-center text-white shadow-2xl shadow-blue-500/20 sm:px-16">

          <div className="mx-auto max-w-2xl">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Rocket size={27} />
            </div>

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
              LAUNCHING SOON
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

            <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-blue-600 shadow-xl">
              <Sparkles size={18} />
              FebRocket is launching soon
            </div>

            <p className="mt-5 text-sm font-semibold text-blue-100">
              Upload once. Fill faster. Review. Submit.
            </p>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

            <div>
              <a href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  <Rocket size={19} />
                </div>

                <span className="text-xl font-bold">
                  FebRocket
                </span>
              </a>

              <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
                An AI agent that helps you fill forms faster.
              </p>
            </div>

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
                  href="/contact"
                  className="block transition hover:text-blue-600"
                >
                  Contact
                </a>
              </div>
            </div>

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

          <div className="mt-12 flex flex-col gap-4 border-t border-slate-100 pt-7 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 FebRocket. All rights reserved.
            </p>

            <p>
              AI-powered form filling
            </p>
          </div>

        </div>
      </footer>

    </main>
  );
}


/* =========================
   COMPONENTS
========================= */

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

function PreviewField({ label, value, completed }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        {completed && (
          <Check
            size={15}
            className="text-green-600"
          />
        )}
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

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
