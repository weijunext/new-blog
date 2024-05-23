import dayjs from "dayjs";
import dotenv from "dotenv";
import { Feed } from "feed";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import gemoji from "remark-gemoji";
import html from "remark-html";
dotenv.config({ path: "./.env" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME;
const TWITTER_USERNAME = process.env.NEXT_PUBLIC_TWITTER_USERNAME;

const markdownToHtml = (markdown) =>
  remark().use(html).use(gemoji).processSync(markdown).toString();

const generateRssFeed = async () => {
  const author = {
    name: AUTHOR_NAME,
    link: `https://x.com/${TWITTER_USERNAME}`,
  };
  const { posts } = await getBlogPosts();

  const latestPosts = posts.slice(0, 12);
  const feed = new Feed({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    generator: SITE_URL,
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
    },
    author,
    copyright: `Copyright © 2024 by @${AUTHOR_NAME}`,
  });

  latestPosts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/article/${post.slug}`,
      link: `${SITE_URL}/article/${post.slug}`,
      description: post.metadata.description,
      content: markdownToHtml(post.content),
      date: post.metadata.date,
      author: [author],
    });
  });

  fs.writeFileSync(`./public/rss.xml`, feed.rss2(), "utf8");
};

generateRssFeed();

async function getBlogPosts() {
  const postsDirectory = path.join(process.cwd(), "content");
  let filenames = await fs.promises.readdir(postsDirectory);
  filenames = filenames.reverse();

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const fullPath = path.join(postsDirectory, filename);
      const fileContents = await fs.promises.readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      const month = dayjs(data.date).format("YYYY-MM-DD").slice(0, 7);

      return {
        id: month,
        metadata: data, // { slug/url title date }
        title: data.title,
        slug: data.slug,
        content,
      };
    })
  );

  // Group by month
  const postsByMonth = posts.reduce((acc, post) => {
    const month = dayjs(post.metadata.date).format("YYYY-MM-DD").slice(0, 7);
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(post);
    return acc;
  }, {});

  return {
    posts,
    postsByMonth,
  };
}
