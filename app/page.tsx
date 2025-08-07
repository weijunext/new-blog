import DeveloperCard from "@/components/DeveloperCard";
import PostList from "@/components/PostList";
import SiteCard from "@/components/SiteCard";
import { getPosts } from "@/lib/post";
import { BlogPost } from "@/types/post";

export default async function Home() {
  const { posts }: { posts: BlogPost[] } = await getPosts();

  return (
    <div className="flex flex-row w-full pt-12">
      <div className="hidden md:block md:w-1/5 pl-6"></div>
      <div className="w-full md:w-3/5 px-6">
        <SiteCard />
        <section className="py-4 mb-8 space-y-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <h3 className="font-bold text-xl text-gray-800">🚀 我的产品推荐：</h3>

          <div className="space-y-3">
            <div className="grid grid-cols-12 gap-4">
              <a
                href="https://nexty.dev/"
                title="Nexty.dev"
                target="_blank"
                className="col-span-2 text-blue-500 hover:text-blue-600 underline font-medium"
              >
                Nexty.dev 全栈模板
              </a>
              <span className="col-span-10 text-gray-600">
                - 多场景 Next.js SaaS
                全栈模板，内置了开箱即用的登录、支付、AI、邮件订阅等基础设施，让你真正专注于业务逻辑
              </span>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <a
                href="https://nextjscn.org"
                title="Next.js 中文文档"
                target="_blank"
                className="col-span-2 text-blue-500 hover:text-blue-600 underline font-medium"
              >
                Next.js 中文文档
              </a>
              <span className="col-span-10 text-gray-600">
                - Next.js 最新中文文档，完整同步官方文档内容和网站样式
              </span>
            </div>
          </div>
        </section>
        <PostList posts={posts} />
        <DeveloperCard />
      </div>
      <div className="hidden md:flex justify-end md:w-1/5 pr-6 text-right"></div>
    </div>
  );
}
