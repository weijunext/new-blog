import { BlogPost } from "@/types/post";

interface Cache {
  posts: BlogPost[] | null;
  lastUpdated: number | null;
}

const cache: Cache = {
  posts: null,
  lastUpdated: null,
};

const isDevelopment = process.env.NODE_ENV !== 'production';
const cacheDuration = isDevelopment ? 0 : 600000; // 开发环境不缓存，生产环境缓存10分钟

export const getCachedPosts = (): BlogPost[] | null => {
  const currentTime = Date.now();
  if (cache.posts && cache.lastUpdated && currentTime - cache.lastUpdated < cacheDuration) {
    return cache.posts;
  }
  return null;
};

export const setCachedPosts = (posts: BlogPost[]): void => {
  cache.posts = posts;
  cache.lastUpdated = Date.now();
};
