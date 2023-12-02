import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
  title: "Annyblog 🦊",
  description: "Generated by create next app",
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
      <body className={GeistSans.className}>
        <div className="flex gap-4 p-4">
          <Sidebar authors={authors} />
          <article className="prose prose-slate max-w-xl pl-8">
            {children}
          </article>
        </div>
      </body>
    </html>
  );
}
