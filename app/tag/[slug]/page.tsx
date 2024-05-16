import DeveloperCard from "@/components/DeveloperCard";
import PostList from "@/components/PostList";
import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/post";
import { BlogPost } from "@/types/post";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const tag = params.slug;

  return {
    ...siteConfig,
    title: `tag: ${tag || "404"} | ${siteConfig.name}`,
  };
}

export default async function TagPosts({ params }: Props) {
  const tag = params.slug;

  const { posts }: { posts: BlogPost[] } = await getPosts();

  const tagPosts = posts.filter((i) =>
    i.tags
      .toLocaleUpperCase()
      .split(",")
      .includes(decodeURIComponent(tag.toLocaleUpperCase()))
  );

  return (
    <div className="flex flex-row w-full pt-12">
      <div className="hidden md:block md:w-1/5 pl-6"></div>
      <div className="w-full md:w-3/5 px-6">
        <PostList posts={tagPosts} />
        <DeveloperCard />
      </div>
      <div className="hidden md:flex justify-end md:w-1/5 pr-6 text-right"></div>
    </div>
  );
}
