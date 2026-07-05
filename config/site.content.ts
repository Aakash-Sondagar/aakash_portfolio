import type { BioPart, NavItem, WorkItem } from "./site.types";

export const siteContent = {
  name: "Aakash Sondagar",
  handle: "Sky",
  email: "aakashsondar@gmail.com",
  url: "https://aakashsondagar.vercel.app",
  description: `Crafting elegant solutions at the intersection of cloud architecture and full-stack development. 
  Transforming complex challenges into seamless experiences through innovative engineering.`,
  assets: {
    profile: "/assets/profile.png",
    signature: "/assets/footer-signature.png",
    favicon: "/assets/favicon.png",
  },
  social: {
    twitter: "https://x.com/AakashSondagar",
    linkedin: "https://www.linkedin.com/in/aakash-sondagar",
    github: "https://github.com/Aakash-Sondagar",
  },
  og: {
    home: "https://aakashsondagar.vercel.app/assets/og-images/og-home.jpg",
    writing: "https://aakashsondagar.vercel.app/assets/og-images/og-writing.jpg",
    default: "https://aakashsondagar.vercel.app/assets/og-images/og-default.jpg",
  },
  nav: [
    { href: "/", label: "Home", key: "home" },
    { href: "/writing", label: "Writing", key: "writing" },
    { href: "/favorites", label: "Favorites", key: "favorites" },
  ] satisfies NavItem[],
  home: {
    featuredPostsCount: 5,
    work: [
      {
        id: "ishantechnologies",
        name: "Ishan Technologies",
        description: "Working on CSaaS product - Terrix AI",
        url: "https://www.ishantechnologies.com/",
        present: true,
        duration: "Feb, 2025 - Present"
      },
      {
        id: "diamondsoncall",
        name: "Diamonds On Call",
        description: "Worked on Supplier side of the platform.",
        url: "https://www.diamondsoncall.com/",
        duration: "Sept, 2024 - Feb, 2025"
      },
      {
        id: "wohlig",
        name: "Wohlig",
        description: "Worked with Many different client from different domains from Fintech to Entertainment",
        url: "https://wohlig.com/",
        duration: "June, 2023 - Aug, 2024",
        logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='15' fill='%234254d4'/%3E%3Cpath d='M9.5 16.5c1.9 2.8 4.1 4.2 6.5 4.2s4.6-1.4 6.5-4.2' stroke='%23fff' stroke-width='2.8' stroke-linecap='round' fill='none'/%3E%3C/svg%3E"
      },
    ] satisfies WorkItem[],
    bio: [
      [
        { 
          kind: "text", 
          value: "I'm a Software Engineer with a passion for building high-quality" 
        },
        { 
          kind: "text", 
          value: `software that people love to use. Over the past 3 and a half years, 
          I've focused on building scalable and maintainable software.`
        },
      ],
      [
        { kind: "text", value: "I regularly " },
        { kind: "internal", label: "write", href: "/writing" },
        { kind: "text", 
          value: ` about my learning, approaches and experiences. 
          These essays are my way of thinking through concepts and sharing what I've learned along the way.` 
        },
      ],
      [
        { kind: "text", value: "Always open to interesting conversations about engineering, startups, and chess. Email me at " },
        { kind: "external", label: "aakashsondar@gmail.com", href: "mailto:aakashsondar@gmail.com" },
        { kind: "text", value: " or follow me on " },
        { kind: "external", label: "X", href: "https://x.com/AakashSondagar" },
        { kind: "text", value: "." },
      ],
    ] satisfies BioPart[][],
  },
  writing: {
    intro:
      `I write whenever inspiration strikes, which means I'm pretty silly about it. 
      These are my raw thoughts on engineering, building products, and the my learning journey. 
      Some are polished, others are more stream-of-consciousness, but they all capture what I was thinking about at the time.`,
    description: "Raw thoughts on engineering, building products, and the my learning journey by Aakash Sondagar.",
  },
  footer: {
    newsletterPlaceholder: "you@youremail.com",
    newsletterNote: "My not so regular newsletter :)",
    successMessage: "Check your inbox to confirm your subscription!",
    errorMessages: {
      invalidEmail: "Hmm, that doesn't look like a valid email.",
      generic: "Hmm, something went wrong. Try again?",
    },
  },
} as const;
