import MDXComponents from "@/components/mdx/MDXComponents";
import { Separator } from "@/components/ui/separator";
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
    title: `make-a-friend | ${siteConfig.name}`,
  };
}

export default async function Page() {
  return (
    <div className="flex flex-row w-full pt-12">
      <aside className="hidden md:block md:w-1/5 pl-6 max-h-[90vh] h-full overflow-auto sticky top-6 left-0"></aside>
      <div className="w-full md:w-3/5 px-2 md:px-12">
        <article id={`article`}>
          <h1>Hi, there!</h1>
          <MDXRemote
            source={content}
            components={MDXComponents}
            options={options}
          />
        </article>
        <Separator className="my-12 bg-gray-600" />
      </div>
      <div className="hidden md:flex flex-col justify-start lg:w-1/5 pr-6"></div>
    </div>
  );
}

const content = `
我创建了两个群：

- 全栈出海交流群
- Next.js 技术交流群（[介绍](https://mp.weixin.qq.com/s/ctq5sYAxfmW9eIBD9IBjbQ)）

如果你有一个独立开发产品的梦想，欢迎加入全栈出海交流群👇

如果你还在学习 Next.js，欢迎加入 Next.js 技术交流群👇

<img src="/wechat.webp" width="30%" />

## 🚀 关于我

全栈工程师，Next.js 开源手艺人，AI降临派。

目前致力于 Next.js 和 Node.js 的项目开发和知识分享。

## 🛠 技能

- 前端：React、Vue、Plasmo 和 Next.js
- 后端：Node.js、Koa、Express 和 Midway.js
- 数据库：Mysql、Prisma 和 Redis
- 运维：PM2 和 Nginx

## 💡 我的产品

- [Next.js 中文文档](https://nextjscn.org/)
- [信息差——独立开发者出海周刊](https://gapis.money)
- [PH Copilot(Product Hunt 助手)](https://PHCopilot.AI/)
- HelloAI（已关闭）

## 🧑‍💻 我的开源与教程

- [Next.js 生态圈技术分享](https://github.com/weijunext/nextjs-learn-demos)
- [Chrome插件全栈开发教程(付费)](https://ship.weijunext.com/)
- [SmartExcel - SaaS 模板](https://smartexcel.cc/)
- [Landing Page Boilerplate](https://landingpage.weijunext.com)
- [Weekly Boilerplate](https://weekly.weijunext.com)

## 📫 联系我

- 邮箱：[weijunext@gmail.com](mailto:weijunext@gmail.com)
- 推特：[@weijunext](https://twitter.com/weijunext)
- 博客：[J实验室](https://weijunext.com/)
- 掘金：[点击访问>>程普](https://juejin.cn/user/26044008768029)
- 知乎：[点击访问>>程普](https://www.zhihu.com/people/mo-mo-mo-89-12-11)
- 即刻：[点击访问>>BigYe程普](https://m.okjike.com/users/13EF1128-B51B-4D22-8B95-16BB406529F0)
- 微博：[点击访问>>BigYe程普](https://weibo.com/u/5890176177)
- 微信公众号：「BigYe程普」

<img src="/gzh.png" alt="程普公众号" width="50%" />
欢迎联系我，接受合作与交流！

![chuhai](/assets/chuhai.webp)

`;
