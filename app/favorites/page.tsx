"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getFaviconUrl } from "@/lib/utils";
import { site, type FavoriteItem } from "@/site.config";

const favoritesList: FavoriteItem[] = site.favorites.items;

// Global cache for microlink image previews to prevent duplicate network calls
const previewCache: Record<string, { image: string | null; loading: boolean }> = {};

function SearchIcon({ isHovered }: { isHovered: boolean }) {
  const color = isHovered ? "currentColor" : "#7c7c67";
  return (
    <div className="relative shrink-0 size-4">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path d="M11.3333 11.3333L14 14" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

// Single favorite item list row component with hover preview logic
function FavoriteRow({ item }: { item: FavoriteItem }) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(async () => {
      setShowPreview(true);
      const cached = previewCache[item.url];
      if (cached && !cached.loading) {
        setPreviewUrl(cached.image);
        return;
      }

      setLoadingPreview(true);
      previewCache[item.url] = { image: null, loading: true };
      try {
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(item.url)}`);
        const data = await res.json();
        const imgUrl = data?.data?.image?.url || data?.data?.logo?.url || null;
        previewCache[item.url] = { image: imgUrl, loading: false };
        setPreviewUrl(imgUrl);
      } catch (err) {
        previewCache[item.url] = { image: null, loading: false };
        setPreviewUrl(null);
      } finally {
        setLoadingPreview(false);
      }
    }, 100);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowPreview(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Absolute Preview Card shown on hover on desktop */}
      <div 
        className={`absolute right-full mr-4 top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-200 ease-out hidden md:block ${
          showPreview ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
        style={{ height: "120px" }}
      >
        {loadingPreview ? (
          <div className="h-30 w-40 bg-olive-100 dark:bg-olive-800 rounded-lg animate-pulse flex items-center justify-center border border-olive-200 dark:border-olive-700 shadow-lg">
            <div className="size-6 border-2 border-olive-300 dark:border-olive-600 border-t-transparent animate-spin rounded-full"></div>
          </div>
        ) : (
          previewUrl && (
            <img 
              src={previewUrl} 
              alt={item.name} 
              className="h-30 w-40 object-cover rounded-lg border border-olive-200 dark:border-olive-700 shadow-lg"
            />
          )
        )}
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex gap-4 items-center relative shrink-0 w-full group"
      >
        <div className="basis-0 flex gap-4 grow items-center min-h-px min-w-px relative shrink-0">
          <div className="relative shrink-0 size-5 bg-white dark:bg-olive-950 rounded overflow-hidden flex items-center justify-center">
            <img
              alt={`${item.name} favicon`}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              src={getFaviconUrl(item.url)}
              loading="lazy"
            />
          </div>
          <div className="flex gap-2 items-center flex-1 min-w-0">
            <p className="font-semibold text-olive-800 dark:text-olive-100 text-sm group-hover:underline underline-offset-4 shrink-0">
              {item.name}
            </p>
            <p className="text-xs text-olive-500 shrink-0">/</p>
            <p className="truncate text-olive-500 dark:text-olive-400 text-sm text-left flex-1">
              {item.description}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const categories = [...site.favorites.categoryFilters];

  // Click outside to close dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCategoryMenu(false);
      }
    };

    if (showCategoryMenu) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showCategoryMenu]);

  // Pre-load all link previews in background on page mount
  useEffect(() => {
    favoritesList.forEach((item, index) => {
      setTimeout(async () => {
        if (previewCache[item.url]) return;
        previewCache[item.url] = { image: null, loading: true };
        try {
          const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(item.url)}`);
          const data = await res.json();
          const imgUrl = data?.data?.image?.url || data?.data?.logo?.url || null;
          previewCache[item.url] = { image: imgUrl, loading: false };
        } catch {
          previewCache[item.url] = { image: null, loading: false };
        }
      }, index * 200); // Stagger requests slightly
    });
  }, []);

  const getMappedCategory = (cat: string): string => {
    if (cat === "All") return "All";
    return site.favorites.categoryMap[cat] ?? "All";
  };

  const filteredFavorites = favoritesList.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase());

    const mapped = getMappedCategory(selectedCategory);
    const matchesCategory = mapped === "All" || item.category === mapped;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-olive-50 dark:bg-olive-950 relative size-full min-h-screen" data-name={`${site.url.replace("https://", "")}/favorites`}>
      <div className="flex flex-col gap-6 items-center mx-auto px-4 py-10 w-full max-w-xl">
        
        {/* Navbar */}
        <div className="animate-in w-full">
          <Navbar />
        </div>

        {/* Intro */}
        <p className="relative shrink-0 text-olive-800 dark:text-olive-100 text-sm/6 text-justify w-full animate-in animate-delay-1">
          {site.favorites.intro}
        </p>

        {/* Search & Category Filter */}
        <div
          className={`flex gap-4 items-center relative shrink-0 w-full animate-in animate-delay-2 ${
            showCategoryMenu ? "z-50" : "z-20"
          }`}
          role="search"
        >
          <div 
            className="basis-0 flex gap-3 grow items-center min-h-px min-w-px relative shrink-0 border-b border-transparent"
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
          >
            <SearchIcon isHovered={isSearchHovered || isSearchFocused} />
            <input
              id="search-favorites"
              type="search"
              placeholder={site.favorites.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="font-normal relative shrink-0 text-sm text-justify bg-transparent border-none outline-none text-olive-800 dark:text-olive-100 placeholder:text-olive-400 dark:placeholder:text-olive-600 w-full"
              aria-label="Search favorites"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowCategoryMenu((open) => !open);
              }}
              className="flex gap-0.5 items-center justify-center relative shrink-0 bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity px-2 py-1 -mx-2 -my-1"
              aria-label="Filter by category"
              aria-haspopup="listbox"
              aria-expanded={showCategoryMenu}
            >
              <p className="font-medium relative shrink-0 text-olive-800 dark:text-olive-100 text-sm text-justify text-nowrap whitespace-pre">
                {selectedCategory}
              </p>
              {/* Chevron icon */}
              <svg className="size-4 text-olive-800 dark:text-olive-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {showCategoryMenu && (
              <div
                className="absolute right-0 top-full mt-2 bg-olive-50 dark:bg-olive-950 border border-olive-200 dark:border-olive-700 rounded-lg shadow-lg py-1 z-50 min-w-32"
                role="listbox"
                aria-label="Filter by category"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedCategory(cat);
                      setShowCategoryMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors ${
                      selectedCategory === cat
                        ? "font-medium text-olive-800 dark:text-olive-100 bg-olive-100 dark:bg-olive-800"
                        : "text-olive-500 hover:text-olive-800 dark:hover:text-olive-100 hover:bg-olive-100 dark:hover:bg-olive-800/50"
                    }`}
                    role="option"
                    aria-selected={selectedCategory === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Favorites list */}
        <div className="animate-in animate-delay-3 relative z-0 w-full mt-4">
          <div className="flex flex-col gap-3 items-start relative shrink-0 w-full">
            {filteredFavorites.length > 0 ? (
              filteredFavorites.map((item) => (
                <FavoriteRow key={item.id} item={item} />
              ))
            ) : (
              <div className="w-full text-center py-8">
                <p className="text-sm text-olive-500 dark:text-olive-400">No favorites found</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="animate-in animate-delay-4 w-full border-t border-olive-200 dark:border-olive-800 pt-6 mt-6">
          <Footer />
        </div>

      </div>
    </div>
  );
}
