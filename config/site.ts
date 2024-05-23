import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsTwitterX, BsWechat } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { SiBuymeacoffee, SiJuejin } from "react-icons/si";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION;
const AUTHOR_NAME = process.env.NEXT_PUBLIC_AUTHOR_NAME;
const TWITTER_USERNAME = process.env.NEXT_PUBLIC_TWITTER_USERNAME;

const baseSiteConfig = {
  name: SITE_NAME || "J实验室",
  description:
    SITE_DESCRIPTION || "全栈工程师，Next.js开源手艺人，掘金签约作者，折腾才有未来",
  url: SITE_URL || "https://weijunext.com",
  metadataBase: '/',
  keywords: ["前端工程师", "前端", "全栈工程师", "全栈", "独立开发者", "indie hacker", "react", "Next.js"],
  authors: [
    {
      name: AUTHOR_NAME || 'weijunext',
      url: "https://weijunext.com",
      twitter: `https://x.com/${TWITTER_USERNAME || 'weijunext'}`,
    }
  ],
  creator: `@${AUTHOR_NAME}`,
  defaultNextTheme: 'dark', // next-theme option: system | dark | light
  verification: {
    google: process.env.NEXT_PUBLIC_SEO_GOOGLE_SITE_VERIFICATION || '',
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  headerLinks: [
    { name: 'repo', href: "https://github.com/weijunext/new-blog", icon: BsGithub },
    { name: 'twitter', href: "https://twitter.com/weijunext", icon: BsTwitterX },
    { name: 'buyMeCoffee', href: "https://www.buymeacoffee.com/weijunext", icon: SiBuymeacoffee }
  ],
  footerLinks: [
    { name: 'email', href: "mailto:weijunext@gmail.com", icon: MdEmail },
    { name: 'twitter', href: "https://twitter.com/weijunext", icon: BsTwitterX },
    { name: 'github', href: "https://github.com/weijunext", icon: BsGithub },
    // { name: 'buyMeCoffee', href: "https://www.buymeacoffee.com/weijunext", icon: SiBuymeacoffee },
    { name: 'juejin', href: "https://juejin.cn/user/26044008768029", icon: SiJuejin },
    { name: 'weChat', href: "https://weijunext.com/make-a-friend", icon: BsWechat }
  ]
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
    images: [`${baseSiteConfig.url}/og.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.jpg`],
    creator: baseSiteConfig.creator,
  },
}
