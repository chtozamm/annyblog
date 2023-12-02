"use client";

import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";
import { useSearchParams } from "next/navigation";

function PostCard(post: Post) {
  return (
    <div className="mb-8 last:mb-0">
      <h2 className="mb-1 mt-0">
        <Link href={post.url} className="text-orange-400 hover:text-orange-300">
          {post.title}
        </Link>
      </h2>
      {/* <span className="mb-2 block text-xs text-gray-600">{post.author}</span> */}
      <time dateTime={post.date} className="mb-2 block text-xs text-gray-600">
        {format(parseISO(post.date), "LLLL d, yyyy")}
      </time>
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
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
      {/* <h2 className="mb-8">Blog posts:</h2> */}
      {posts
        .filter((post) => (author ? post.author === author : true))
        .map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
    </>
  );
}
