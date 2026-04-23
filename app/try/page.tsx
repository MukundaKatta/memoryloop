"use client";

import { useState, useRef, useCallback } from "react";

type Phase = "upload" | "restoring" | "result";

export default function TryPage() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setPhase("restoring");
    // Simulate processing delay
    setTimeout(() => {
      setPhase("result");
      setSliderPos(50);
    }, 1800);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  const updateSlider = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true;
    updateSlider(e.clientX);
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current) return;
    updateSlider(e.clientX);
  }

  function onMouseUp() {
    isDragging.current = false;
  }

  function onTouchMove(e: React.TouchEvent) {
    updateSlider(e.touches[0].clientX);
  }

  function reset() {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setOriginalUrl(null);
    setPhase("upload");
  }

  return (
    <>
      {/* NAV */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500" />
          MemoryLoop
        </a>
        <a
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </a>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-rose-600">
            Demo
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Restore a photo
          </h1>
          <p className="mt-3 text-neutral-600">
            Upload a grainy or faded photo and see it brought back to life.
            Drag the slider to compare before and after.
          </p>
        </div>

        {/* UPLOAD PHASE */}
        {phase === "upload" && (
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-8 py-20 text-center transition hover:border-rose-400 hover:bg-rose-50"
          >
            <div className="mb-4 text-5xl">📷</div>
            <p className="text-lg font-semibold text-neutral-800">
              Drop a photo here
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              or click to browse your files
            </p>
            <label className="mt-6 cursor-pointer rounded-full bg-rose-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-rose-700">
              Choose photo
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onFileInput}
              />
            </label>
            <p className="mt-4 text-xs text-neutral-400">
              JPG, PNG, WEBP — any grainy or faded family photo works great
            </p>
          </div>
        )}

        {/* RESTORING PHASE */}
        {phase === "restoring" && (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-50 px-8 py-20 text-center">
            {originalUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={originalUrl}
                alt="Original"
                className="mb-6 h-40 w-auto rounded-xl object-cover opacity-60 grayscale"
              />
            )}
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-rose-200 border-t-rose-600" />
            <p className="text-lg font-semibold text-neutral-800">
              Restoring…
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              Enhancing colors, sharpness, and detail
            </p>
          </div>
        )}

        {/* RESULT PHASE */}
        {phase === "result" && originalUrl && (
          <div className="space-y-6">
            {/* Slider */}
            <div
              ref={sliderRef}
              className="relative aspect-video w-full cursor-col-resize select-none overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={(e) => updateSlider(e.touches[0].clientX)}
              onTouchMove={onTouchMove}
            >
              {/* AFTER — restored (full width, CSS filters simulate enhancement) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Restored"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  filter:
                    "contrast(1.18) saturate(1.45) brightness(1.08) sharpen(1)",
                }}
              />

              {/* BEFORE — original (clipped to left of slider) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalUrl}
                  alt="Original"
                  draggable={false}
                  className="h-full object-cover"
                  style={{
                    width: sliderRef.current
                      ? `${sliderRef.current.offsetWidth}px`
                      : "100%",
                    filter: "grayscale(0.6) contrast(0.85) brightness(0.9)",
                  }}
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                  Before
                </div>
              </div>

              {/* Divider */}
              <div
                className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lg"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
                  <svg
                    className="h-4 w-4 text-neutral-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l-4 3 4 3M16 9l4 3-4 3"
                    />
                  </svg>
                </div>
              </div>

              {/* After label */}
              <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium">
                After · restored
              </div>
            </div>

            <p className="text-center text-sm text-neutral-500">
              Drag the slider to compare before and after
            </p>

            {/* Actions */}
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={reset}
                className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                Try another photo
              </button>
              <a
                href="/#waitlist"
                className="rounded-full bg-rose-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-rose-700"
              >
                Join the waitlist to save results
              </a>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-rose-50 p-5 text-center">
              <p className="text-sm font-semibold text-rose-800">
                This is a v0 demo — filters are mocked in CSS.
              </p>
              <p className="mt-1 text-sm text-rose-700">
                The real product uses AI to restore scratches, correct colors,
                and sharpen detail at pixel level. Join the waitlist for early
                access.
              </p>
            </div>
          </div>
        )}
      </main>

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
