import Comments from "@/components/Comments";
import PostList from "@/components/PostList";
import TOC from "@/components/TOC";
import { Aside } from "@/components/mdx/Aside";
import MDXComponents from "@/components/mdx/MDXComponents";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/post";
import { BlogPost } from "@/types/post";
import dayjs from "dayjs";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const options = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          keepBackground: false,
          defaultLang: {
            block: "typescript",
            // inline: "javascript",
          },
          // getHighlighter: (options) =>
          //   getHighlighter({
          //     ...options,
          //     paths: {
          //       themes: "https://cdn.jsdelivr.net/npm/shiki@latest/themes",
          //       wasm: "https://cdn.jsdelivr.net/npm/shiki@latest/dist",
          //       languages:
          //         "https://cdn.jsdelivr.net/npm/shiki@latest/languages",
          //     },
          //   }),
        },
      ],
    ],
  },
};

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const { posts }: { posts: BlogPost[] } = await getPosts();
  const post: BlogPost | undefined = posts.find(
    (post) => post.slug === slug || post.slugId === slug
  );

  return {
    ...siteConfig,
    title: `${post?.title || "404"} | ${siteConfig.name}`,
    description: post?.description || siteConfig.description,
    openGraph: {
      ...siteConfig.openGraph,
      title: `${post?.title || "404"} | ${siteConfig.name}`,
    },
    twitter: {
      ...siteConfig.twitter,
      title: `${post?.title || "404"} | ${siteConfig.name}`,
    },
  };
}

export default async function PostDetailsPage({ params }: Props) {
  const { slug } = params;
  const { posts }: { posts: BlogPost[] } = await getPosts();
  const postIndex = posts.findIndex(
    (post) => post.slug === slug || post.slugId === slug
  );
  const post = posts[postIndex];
  // Reverse list order, thus invert condition check
  const nextPost = postIndex - 1 >= 0 ? posts[postIndex - 1] : null;
  const prevPost = postIndex + 1 < posts.length ? posts[postIndex + 1] : null;

  if (!post) {
    notFound();
  }

  if (post.slugId && post.slugId === slug) {
    permanentRedirect(`/article/${post.slug}`);
  }

  const { content, title, date } = post;

  return (
    <div className="flex flex-row w-full pt-0">
      <aside className="hidden md:block md:w-1/5 pl-6 max-h-[90vh] h-full overflow-auto sticky top-16 left-0 mt-6">
        <PostList isSide posts={posts} />
      </aside>
      <div className="w-full md:w-3/5 px-2 md:px-12">
        <article id={`article`}>
          <h1>{title}</h1>
          <Aside icon="🧑‍💻">
            <div>推荐全栈学习资源：</div>
            <li>
              <Link
                href="https://nextjscn.org/docs?utm_source=gapis.money"
                title="Next.js 中文文档"
                target="_blank"
                className="link-underline"
              >
                Next.js 中文文档
              </Link>
              ：样式和官网一样的中文文档，创造沉浸式Next.js中文学习体验。
            </li>
            <li>
              <Link
                href="https://xiaobot.net/p/ship-ph-copilot?refer=1e5db497-8ed5-461b-af85-e71cb80e3787"
                title="PHCopilot.AI"
                target="_blank"
                className="link-underline"
                rel="noopener norefferer nofollow"
              >
                《Chrome插件全栈开发》
              </Link>
              ：真实出海项目的实战教学课，讲解Chrome插件和Next.js端的全栈开发，帮助你半个月内成为全栈出海工程师。
            </li>
          </Aside>
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={options as any}
          />
        </article>
        <Separator className="my-12 bg-gray-600" />
        <div className="flex justify-between">
          <div className="flex gap-2 flex-col lg:flex-row">
            <div>发布时间：{dayjs(date).format("YYYY-MM-DD")}</div>
            <Link
              href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh-hans"
              title="版权声明"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="link link-hover"
            >
              <span className="hidden lg:flex items-center">版权声明</span>
              <span className="flex lg:hidden">
                版权声明：CC BY-NC-ND 3.0 DEED
              </span>
            </Link>
          </div>
          <div className="flex gap-2 flex-col lg:flex-row">
            {prevPost ? (
              <Link
                href={prevPost.slug}
                className="link-underline"
                title="上一篇"
              >
                上一篇
              </Link>
            ) : (
              <></>
            )}
            {nextPost ? (
              <Link
                href={nextPost.slug}
                className="link-underline"
                title="下一篇"
              >
                下一篇
              </Link>
            ) : (
              <></>
            )}
            <Link href="/" className="link-underline" title="去首页">
              去首页
            </Link>
            <Link
              href="https://twitter.com/weijunext/"
              title="Twitter/X"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="link-underline"
            >
              Twitter/X
            </Link>
          </div>
        </div>
        <div className="mt-16">
          <Comments />
        </div>
      </div>
      <div className="hidden lg:flex flex-col justify-start lg:w-1/5 pr-6">
        <TOC />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { posts }: { posts: BlogPost[] } = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
