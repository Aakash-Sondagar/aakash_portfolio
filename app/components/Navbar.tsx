"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { site } from "@/site.config";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const getActiveKey = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/writing")) return "writing";
    if (pathname.startsWith("/favorites")) return "favorites";
    return "";
  };

  const activeKey = getActiveKey();

  const links = site.nav;

  const getLinkClassName = (key: string) => {
    return `font-medium relative shrink-0 text-sm text-justify text-nowrap whitespace-pre transition-all ${
      activeKey === key
        ? "text-olive-800 dark:text-olive-100 font-semibold"
        : "text-olive-500 dark:text-olive-400 hover:text-olive-800 dark:hover:text-olive-100"
    }`;
  };

  return (
    <div className="flex flex-col gap-4 items-start relative z-30 shrink-0 w-full">
      <Link href="/" className="flex h-10 items-center justify-start relative shrink-0 w-full" aria-label="Go to home">
        <Image
          alt={`${site.name} profile picture`}
          className="size-10 rounded-full"
          src={site.assets.profile}
          width={40}
          height={40}
          priority
        />
      </Link>
      
      <Link href="/" className="flex gap-1 h-6 items-center w-full hover:opacity-70 transition-opacity" aria-label={`${site.name} home`}>
        <h1 className="font-medium relative shrink-0 text-olive-800 dark:text-olive-100 text-xl text-justify text-nowrap whitespace-pre">
          <span className="font-medium">{site.name} </span>
          <span className="font-serif text-2xl italic">aka</span>
          <span className="font-medium"> @{site.handle}</span>
        </h1>
      </Link>

      <nav className="flex gap-4 items-center relative shrink-0 w-full" aria-label="Main navigation">
        {links.map(({ href, label, key }) => (
          <Link key={key} href={href} className={getLinkClassName(key)} aria-current={activeKey === key ? "page" : undefined}>
            {label}
          </Link>
        ))}

        <div 
          className="ml-auto relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            onClick={toggleTheme}
            className="group relative cursor-pointer bg-transparent border-none px-2 py-1 -mx-2 -my-1 transition-all text-olive-500 hover:text-olive-800 dark:text-olive-400 dark:hover:text-olive-50 flex items-center"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className="size-4">
              {theme === "dark" ? (
                // Sun Icon SVG
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <path
                    d="M7.99882 0.666664C8.36695 0.666664 8.66549 0.965144 8.66549 1.33333V2.66666C8.66549 3.03485 8.36695 3.33333 7.99882 3.33333C7.63062 3.33333 7.33215 3.03485 7.33215 2.66666V1.33333C7.33215 0.965144 7.63062 0.666664 7.99882 0.666664ZM2.86195 2.86258C3.1223 2.60223 3.54441 2.60223 3.80476 2.86258L4.80411 3.86192C5.06445 4.12228 5.06445 4.54438 4.80411 4.80474C4.54376 5.06508 4.12165 5.06508 3.8613 4.80474L2.86195 3.80538C2.6016 3.54504 2.6016 3.12292 2.86195 2.86258ZM13.1368 2.86258C13.3972 3.12292 13.3972 3.54504 13.1368 3.80538L12.1374 4.80474C11.8771 5.06508 11.455 5.06508 11.1946 4.80474C10.9343 4.54438 10.9343 4.12228 11.1946 3.86192L12.194 2.86258C12.4544 2.60223 12.8764 2.60223 13.1368 2.86258ZM0.666687 8C0.666687 7.6318 0.965167 7.33333 1.33335 7.33333H2.66669C3.03487 7.33333 3.33335 7.6318 3.33335 8C3.33335 8.3682 3.03487 8.66666 2.66669 8.66666H1.33335C0.965167 8.66666 0.666687 8.3682 0.666687 8ZM12.6667 8C12.6667 7.6318 12.9652 7.33333 13.3334 7.33333H14.6667C15.0349 7.33333 15.3334 7.6318 15.3334 8C15.3334 8.3682 15.0349 8.66666 14.6667 8.66666H13.3334C12.9652 8.66666 12.6667 8.3682 12.6667 8ZM4.80476 11.1953C5.06511 11.4556 5.06511 11.8777 4.80476 12.1381L3.80476 13.1381C3.54441 13.3984 3.1223 13.3984 2.86195 13.1381C2.6016 12.8777 2.6016 12.4556 2.86195 12.1953L3.86195 11.1953C4.1223 10.9349 4.54441 10.9349 4.80476 11.1953ZM11.1953 11.1959C11.4556 10.9355 11.8778 10.9355 12.1381 11.1959L13.1381 12.1959C13.3984 12.4563 13.3984 12.8784 13.1381 13.1387C12.8778 13.3991 12.4556 13.3991 12.1953 13.1387L11.1953 12.1387C10.935 11.8784 10.935 11.4563 11.1953 11.1959ZM7.99882 12.6667C8.36695 12.6667 8.66549 12.9651 8.66549 13.3333V14.6667C8.66549 15.0349 8.36695 15.3333 7.99882 15.3333C7.63062 15.3333 7.33215 15.0349 7.33215 14.6667V13.3333C7.33215 12.9651 7.63062 12.6667 7.99882 12.6667Z"
                    fill="currentColor"
                  />
                  <path
                    d="M4.16669 8C4.16669 5.8829 5.88293 4.16666 8.00002 4.16666C10.1171 4.16666 11.8334 5.8829 11.8334 8C11.8334 10.1171 10.1171 11.8333 8.00002 11.8333C5.88293 11.8333 4.16669 10.1171 4.16669 8Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                // Moon Icon SVG
                <svg className="block size-full" fill="none" viewBox="0 0 16 16">
                  <path
                    d="M7.01089 1.36195C7.13055 1.51764 7.14802 1.72894 7.05549 1.90215C6.6662 2.63124 6.4453 3.46402 6.4453 4.34988C6.4453 7.22444 8.77555 9.55471 11.6501 9.55471C12.536 9.55471 13.3688 9.33378 14.0978 8.94451C14.271 8.85198 14.4824 8.86944 14.638 8.98911C14.7938 9.10878 14.865 9.30844 14.8202 9.49965C14.1038 12.5566 11.3606 14.8333 8.08462 14.8333C4.26395 14.8333 1.16669 11.736 1.16669 7.91538C1.16669 4.63935 3.44339 1.89628 6.50035 1.17984C6.69155 1.13503 6.89122 1.20627 7.01089 1.36195Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </div>
          </button>

          {/* Tooltip */}
          <div 
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-olive-950 dark:bg-olive-100 text-olive-50 dark:text-olive-800 text-xs rounded pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 ${
              showTooltip ? "opacity-100" : "opacity-0"
            }`}
          >
            {theme === "dark" ? "Delight" : "Go Dark"}
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-olive-950 dark:border-t-olive-100"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}
