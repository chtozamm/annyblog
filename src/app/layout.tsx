import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Sidebar from "./Sidebar";
import Link from "next/link";

export const viewport: Viewport = {
  themeColor: "#09090b",
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Annyblog",
    default: "Annyblog",
  },
  metadataBase: new URL("https://www.annyblog.fun"),
  description:
    "Share your story with Annyblog and join us exploring the world ✨",
  openGraph: {
    title: "Annyblog",
    description:
      "Share your story with Annyblog and join us exploring the world ✨",
    url: "https://www.annyblog.fun",
    images: [
      {
        url: "https://www.annyblog.fun/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Annyblog 🦊",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Annyblog",
    description:
      "Share your story with Annyblog and join us exploring the world ✨",
    card: "summary_large_image",
    images: {
      url: "https://www.annyblog.fun/twitter-image.png",
      alt: "Annyblog 🦊",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  const authors = Array.from(new Set(posts.map((post) => post.author)));
  return (
    <html lang="en">
      <body
        className={GeistSans.className + ` dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <header className="flex items-center justify-center p-4 md:hidden">
          <Link className="text-2xl font-semibold" href="/">
            Annyblog 🦊
          </Link>
        </header>
        <div className="flex gap-4 p-4">
          <Sidebar authors={authors} />
          <article className="max-w-xl px-4 md:pl-8">{children}</article>
        </div>
      </body>
    </html>
  );
}
