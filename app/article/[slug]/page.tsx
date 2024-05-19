import Comments from "@/components/Comments";
import PostList from "@/components/PostList";
import TOC from "@/components/TOC";
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
            inline: "javascript",
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
    <div className="flex flex-row w-full pt-12">
      <aside className="hidden md:block md:w-1/5 pl-6 max-h-[90vh] h-full overflow-auto sticky top-6 left-0">
        <PostList isSide posts={posts} />
      </aside>
      <div className="w-full md:w-3/5 px-2 md:px-12">
        <article id={`article`}>
          <h1>{title}</h1>
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
              <Link href={prevPost.slug} className="link-underline">
                上一篇
              </Link>
            ) : (
              <></>
            )}
            {nextPost ? (
              <Link href={nextPost.slug} className="link-underline">
                下一篇
              </Link>
            ) : (
              <></>
            )}
            <Link href="/" className="link-underline">
              去首页
            </Link>
            <Link
              href="https://twitter.com/weijunext/"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="link-underline"
            >
              Twitter/X
            </Link>
          </div>
        </div>
        <Comments />
      </div>
      <div className="hidden md:flex flex-col justify-start lg:w-1/5 pr-6">
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
