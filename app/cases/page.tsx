import MDXComponents from "@/components/mdx/MDXComponents";
import { siteConfig } from "@/config/site";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
};

export async function generateMetadata() {
  return {
    ...siteConfig,
    title: `商务合作案例 | ${siteConfig.name}`,
  };
}

export default async function Page() {
  return (
    <div className="flex flex-row w-full pt-12">
      <aside className="hidden md:block md:w-1/5 pl-6 max-h-[90vh] h-full overflow-auto sticky top-6 left-0"></aside>
      <div className="w-full md:w-3/5 px-2 md:px-12">
        <article id={`article`}>
          <h1>合作案例</h1>
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={options}
          />
        </article>
      </div>
      <div className="hidden md:flex flex-col justify-start lg:w-1/5 pr-6"></div>
    </div>
  );
}

const content = `

- 推特账号：@weijunext（https://x.com/weijunext/ ）
- 即刻账号：@BigYe程普（https://okjk.co/dY4Qlq/ ）
- 微博账号：@BigYe程普（https://weibo.com/u/5890176177/ ）
- 微信朋友圈：bigye_chengpu

## 案例展示

- Edrawmax

  推特链接🔗：https://x.com/weijunext/status/1784490203044040960
  
  数据截图📊：  
  <img src="/assets/cases/1.edrawmax.webp" alt="Edrawmax" width="50%" />
  
- Youtube中文配音

  推特链接🔗：https://x.com/weijunext/status/1787392128999715000

  数据截图📊：  
  <img src="/assets/cases/2.youtube-dubbing.webp" alt="youtube-dubbing" width="50%" />

- Metatrend

  推特链接🔗：https://x.com/weijunext/status/1790587042616971654
  
  数据截图📊：  
  <img src="/assets/cases/3.metatrend.webp" alt="Edrawmax" width="50%" />


## 合作咨询
<img src="/wechat.webp" alt="程普微信" width="50%" />
欢迎联系我，开放合作与交流！

`;
