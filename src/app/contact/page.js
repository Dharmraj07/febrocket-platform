
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Rocket,
} from "lucide-react";

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
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


      {/* CONTACT */}
      <section className="flex min-h-[calc(100vh-80px)] items-center px-6 py-16">

        <div className="mx-auto w-full max-w-3xl">

          {/* Heading */}
          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Mail size={26} />
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Get in touch.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-500">
              Have a question, feedback, or need help with FebRocket?
              We're here to help.
            </p>

          </div>


          {/* Contact Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">

            {/* Email */}
            <a
              href="mailto:hello@febrocket.com"
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Mail size={22} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Email
              </p>

              <p className="mt-2 text-lg font-bold text-blue-600">
                hello@febrocket.com
              </p>

            </a>


            {/* Phone */}
            <a
              href="tel:+919835373057"
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                <Phone size={22} />
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Phone
              </p>

              <p className="mt-2 text-lg font-bold text-blue-600">
                +91 98353 73057
              </p>

            </a>

          </div>


          {/* Footer Message */}
          <p className="mt-10 text-center text-sm text-slate-400">
            We’ll get back to you as soon as possible.
          </p>

        </div>

      </section>

    </main>
  );
}
