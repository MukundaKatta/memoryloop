"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    }
  }

  return (
    <>
      {/* NAV */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
          MemoryLoop
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-rose-100 via-rose-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-700">
            Consumer AI
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Bring old photos back to life.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Restore grainy family photos in one tap. Turn them into short videos
            you actually want to share.
          </p>

          <form
            id="waitlist"
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            {!submitted ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
                />
                <button
                  type="submit"
                  className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
                >
                  Join the waitlist
                </button>
              </>
            ) : (
              <p className="text-sm font-medium text-rose-700">
                Thanks. We will ping you the day we launch.
              </p>
            )}
          </form>

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* DEMO */}
      <section
        id="demo"
        className="border-y border-neutral-200 bg-neutral-50 py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See it in action
            </h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl">
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-amber-100 to-rose-100 opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-7xl">🖼️</div>
                    <div className="text-sm text-rose-900">
                      1952 family portrait · restored
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 top-0 w-1/2 overflow-hidden border-r-2 border-white">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-400 via-neutral-500 to-neutral-700 opacity-90" />
                  <div className="absolute inset-0 flex items-center justify-center text-7xl grayscale opacity-50">
                    🖼️
                  </div>
                  <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                    Before
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">
                  After · 1 tap
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What you get
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">✨</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                One-tap restore
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                AI cleans up scratches, colors, and blur. No Photoshop skills
                needed.
              </p>
            </div>
            <div>
              <div className="text-3xl">🎬</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Photo to video
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Turn a still image into a living, moving memory in seconds.
              </p>
            </div>
            <div>
              <div className="text-3xl">👪</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Made for families
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Shared albums, group timelines, and easy gifting on any
                birthday.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Sign up in seconds
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Email or phone. That's it. No credit card needed to start.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Upload your photo
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Drop in any grainy, faded, or damaged photo from your camera
                roll.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Get value in the first minute
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Not your first day. Your first minute. Try it free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRY IT CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Want to try it now?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Upload a grainy photo and see the restore in action — no account
          required.
        </p>
        <a
          href="/try"
          className="mt-6 inline-block rounded-full bg-rose-600 px-7 py-3.5 font-medium text-white transition hover:bg-rose-700"
        >
          Try the demo →
        </a>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the
          moment we open the doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-rose-600 px-7 py-3.5 font-medium text-white transition hover:bg-rose-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
            MemoryLoop
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
