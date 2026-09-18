"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  MessageSquare,
  Rocket,
} from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
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
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left */}
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <MessageSquare size={24} />
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Get in touch.
            </h1>

            <p className="mt-5 max-w-md text-lg leading-8 text-slate-500">
              Have a question, feedback, or need help with FebRocket? We'd love
              to hear from you.
            </p>

            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Mail size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Email us
                  </p>

                  <a
                    href="mailto:hello@febrocket.com"
                    className="mt-1 block text-sm text-blue-600 hover:underline"
                  >
                    hello@febrocket.com
                  </a>

                  <p className="mt-2 text-xs text-slate-400">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10">
            {submitted ? (
              <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <Mail size={28} />
                </div>

                <h2 className="mt-6 text-2xl font-bold">
                  Message received!
                </h2>

                <p className="mt-3 max-w-sm text-slate-500">
                  Thank you for contacting FebRocket. We'll get back to you as
                  soon as possible.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold">Send us a message</h2>

                <p className="mt-2 text-sm text-slate-500">
                  Fill out the form below and we'll contact you.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Name
                    </label>

                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <input
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Subject
                    </label>

                    <input
                      type="text"
                      placeholder="How can we help?"
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Message
                    </label>

                    <textarea
                      rows={6}
                      placeholder="Write your message..."
                      required
                      className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5"
                  >
                    Send Message
                    <ArrowRight
                      size={18}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}