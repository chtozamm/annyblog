"use client";

import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { useSearchParams } from "next/navigation";

function PostCard(post: Post) {
  return (
    <Link href={post.url} className="group mb-8 block last:mb-0">
      <h2 className="mb-1 mt-0 text-lg text-orange-400 group-hover:text-orange-300">
        {post.title}
      </h2>
      {/* <span className="mb-2 block text-xs text-zinc-600">{post.author}</span> */}
      <time dateTime={post.date} className="mb-2 block text-xs text-zinc-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div
        dangerouslySetInnerHTML={{ __html: post.body.html }}
        className="line-clamp-3 flex max-h-6 flex-col gap-4 leading-6 [&_li]:ml-3 [&_li]:list-disc [&_p]:w-fit"
      />
    </Link>
  );
}

export default function Home({}) {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );
  const searchParams = useSearchParams();
  const author = searchParams.get("author");
  return (
    <>
      {posts
        .filter((post) => (author ? post.author === author : true))
        .map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
    </>
  );
}
