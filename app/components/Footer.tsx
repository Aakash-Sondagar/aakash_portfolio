"use client";

import React, { useState } from "react";
import Image from "next/image";
import { site } from "@/site.config";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage(site.footer.errorMessages.invalidEmail);
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || site.footer.errorMessages.generic);
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(site.footer.errorMessages.generic);
    }
  };

  return (
    <footer className="flex flex-col gap-6 items-center justify-center w-full mt-12">
      {/* Signature Image */}
      <Image
        alt={site.name}
        className="h-10 w-auto object-contain pointer-events-none dark:invert"
        src={site.assets.signature}
        width={150}
        height={40}
      />

      {/* Traffic Light Dots */}
      <div className="flex gap-2 items-center justify-center py-2 w-full" aria-hidden="true">
        <div className="size-2">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <circle cx="4" cy="4" fill="#E9573F" r="4" />
          </svg>
        </div>
        <div className="size-2">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <circle cx="4" cy="4" fill="#F0BF2E" r="4" />
          </svg>
        </div>
        <div className="size-2">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
            <circle cx="4" cy="4" fill="#4E964E" r="4" />
          </svg>
        </div>
      </div>

      {/* Newsletter signup form (commented out for the time being) */}
      {/* 
      <div className="flex flex-col gap-2 items-center relative shrink-0 w-full max-w-sm px-4">
        {status !== "success" ? (
          <form 
            onSubmit={handleSubscribe} 
            className="flex items-center justify-between relative shrink-0 w-full pr-1 rounded-[12px] bg-white dark:bg-olive-950 group"
            noValidate
          >
            <div 
              aria-hidden="true" 
              className="absolute border-1 rounded-[12px] border-olive-300 dark:border-olive-700 border-solid inset-0 pointer-events-none transition-colors duration-200 group-hover:border-olive-400 dark:group-hover:border-olive-600 group-focus-within:border-olive-400 dark:group-focus-within:border-olive-600"
            ></div>
            <label htmlFor="email-subscribe" className="sr-only">
              Email Address
            </label>
            <input
              id="email-subscribe"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!e.target.value) {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              placeholder={site.footer.newsletterPlaceholder}
              disabled={status === "loading"}
              className="relative text-sm pl-4 py-2 bg-transparent border-none outline-none text-olive-800 dark:text-olive-100 placeholder:text-olive-400 dark:placeholder:text-olive-600 flex-1 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading" || !email}
              className="font-medium font-mono px-4 py-1 relative shrink-0 text-olive-800 dark:text-olive-100 text-sm text-justify text-nowrap uppercase whitespace-pre opacity-70 hover:opacity-100 transition-opacity cursor-pointer bg-olive-300 dark:bg-olive-600 border-none disabled:opacity-40 disabled:cursor-not-allowed rounded-lg z-10"
            >
              {status === "loading" ? "Submitting..." : "SUBSCRIBE"}
            </button>
          </form>
        ) : (
          <p className="text-sm text-center text-lime-600 dark:text-lime-400 font-medium">
            {site.footer.successMessage}
          </p>
        )}

        {status === "error" && (
          <p className="text-xs text-red-500 mt-1 text-center">
            {errorMessage}
          </p>
        )}

        <p className="text-[10px] text-olive-500 dark:text-olive-400 text-center mt-2">
          {site.footer.newsletterNote}
        </p>
      </div>
      */}
    </footer>
  );
}
