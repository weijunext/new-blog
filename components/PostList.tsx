import { BlogPost } from "@/types/post";
import dayjs from "dayjs";
import Link from "next/link";

export default async function PostList({
  isSide,
  posts,
}: {
  isSide?: boolean;
  posts: BlogPost[];
}) {
  const renderPosts = posts.filter((i) => i.visible);
  return (
    <ul className="flex flex-col gap-4">
      {renderPosts.map((post: BlogPost) => (
        <li
          id={post.id}
          key={post.slug}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          {isSide ? (
            <></>
          ) : (
            <span className="text-[#8585a8] min-w-28">
              {dayjs(post.date).format("YYYY-MM-DD")}
            </span>
          )}
          <Link
            href={`/article/${post.slug}`}
            title={post.title}
            prefetch={false}
            className="link-default w-full transition-colors duration-500 ease-in-out flex justify-start items-center"
          >
            {post.pin ? "🔥" : <></>}
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
