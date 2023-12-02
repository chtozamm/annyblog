"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function Sidebar({ authors }: { authors: string[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  return (
    <>
      <div className="hidden border-r px-8 dark:border-zinc-600 md:block">
        <Link className="text-3xl font-semibold" href="/">
          Annyblog 🦊
        </Link>
        <div className="">
          <div className="mb-1 mt-8 text-lg font-semibold">Authors:</div>
          <div className="flex flex-col">
            {authors.map((author: string) => (
              <Link
                href={"/" + "?" + createQueryString("author", author)}
                key={author}
                className={`${
                  searchParams.get("author") === author ? "font-semibold" : ""
                } cursor-pointer text-orange-400 hover:text-orange-300`}
              >
                {author}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
