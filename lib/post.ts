import { getCachedPosts, setCachedPosts } from '@/lib/cache';
import { BlogPost } from '@/types/post';
import dayjs from 'dayjs';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const POSTS_BATCH_SIZE = 10;

export async function getPosts(): Promise<{ posts: BlogPost[] }> {
  const cachedPosts = getCachedPosts();
  if (cachedPosts) {
    return { posts: cachedPosts };
  }

  const postsDirectory = path.join(process.cwd(), 'content');
  let filenames = await fs.promises.readdir(postsDirectory);
  filenames = filenames.reverse();

  let allPosts: BlogPost[] = [];

  // 分批次读取文件，避免一次性加载所有文件
  for (let i = 0; i < filenames.length; i += POSTS_BATCH_SIZE) {
    const batchFilenames = filenames.slice(i, i + POSTS_BATCH_SIZE);

    // 并行读取文件
    const batchPosts: BlogPost[] = await Promise.all(
      batchFilenames.map(async (filename) => {
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = await fs.promises.readFile(fullPath, 'utf8');

        const { data, content } = matter(fileContents);
        const month = dayjs(data.date).format('YYYY-MM-DD').slice(0, 7);

        const visible = !(data.visible === 'draft' || data.visible === 'invisible');
        const pin = data.pin && data.pin === 'pin';

        return {
          id: month,
          metadata: data, // 已在下面解析出来
          title: data.title,
          slug: data.slug,
          slugId: data.slugId,
          category: data.category,
          tags: data.tags,
          date: data.date,
          visible,
          pin,
          content,
        };
      })
    );

    allPosts.push(...batchPosts);
  }

  // 将帖子按照是否置顶(pin)排序，置顶帖子在前    
  allPosts = allPosts.sort((a, b) => {
    return (b.pin === true ? 1 : 0) - (a.pin === true ? 1 : 0);
  });

  setCachedPosts(allPosts);
  return {
    posts: allPosts,
  };
}
