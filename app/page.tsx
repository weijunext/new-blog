import DeveloperCard from "@/components/DeveloperCard";
import PostList from "@/components/PostList";
import FooterLinks from "@/components/footer/FooterLinks";
import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/post";
import { BlogPost } from "@/types/post";

export default async function Home() {
  const { posts }: { posts: BlogPost[] } = await getPosts();

  return (
    <div className="flex flex-row w-full pt-12">
      <div className="hidden md:block md:w-1/5 pl-6"></div>
      <div className="w-full md:w-3/5 px-6">
        <section className="pt-8 pb-8 mb-12 space-y-8 border-t border-gray-600 border-b">
          <h1 className="my-2 text-main">{siteConfig.name}</h1>
          <p>{siteConfig.description}</p>
          <FooterLinks />
        </section>
        <PostList posts={posts} />
        <DeveloperCard />
      </div>
      <div className="hidden md:flex justify-end md:w-1/5 pr-6 text-right"></div>
    </div>
  );
}
