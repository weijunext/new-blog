"use client";

import { Divider } from "@nextui-org/react";
import React from "react";

import FooterLinks from "@/components/footer/FooterLinks";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const footerNavigation = {
  blog: [
    { name: "J实验室", href: "https://weijunext.com/", target: "_self" },
    { name: "关于我", href: "/make-a-friend", target: "_self" },
    { name: "赞助榜", href: "/thanks", target: "_self" },
    { name: "友链", href: "/links", target: "_self" },
    {
      name: "版权声明",
      href: "https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh-hans",
      rel: "noopener noreferrer nofollow",
    },
  ],
  learning: [
    { name: "WeNext", href: "https://wenext.dev/zh" },
    {
      name: "Chrome插件全栈教程",
      href: "https://ship.weijunext.com/",
      rel: "noopener noreferrer nofollow",
    },
    { name: "Next.js 中文文档", href: "https://nextjscn.org/" },
  ],
  boilerplate: [
    { name: "Next.js SaaS 全栈模板", href: "https://nexty.dev/zh" },
    { name: "Next 多语言模板", href: "https://nextforge.dev/" },
    { name: "博客模板", href: "https://weekly.weijunext.com/" },
  ],
  indieHacker: [
    {
      name: "OG Image Generator",
      href: "https://ogimage.click/?utm_source=weijunext",
    },
    {
      name: "nTab",
      href: "https://ntab.dev/?utm_source=weijunext",
    },
  ],
};

export default function Footer() {
  const d = new Date();
  const currentYear = d.getFullYear();
  const { authors } = siteConfig;
  const renderList = React.useCallback(
    ({
      title,
      items,
    }: {
      title: string;
      items: {
        name: string;
        href: string;
        target?: string;
        rel?: string;
      }[];
    }) => (
      <div>
        <h3 className="text-small font-semibold">{title}</h3>
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                className="text-default-500 text-sm"
                href={item.href}
                title={item.name}
                prefetch={false}
                target={item.target || "_blank"}
                rel={item.rel || ""}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ),
    []
  );

  return (
    <footer className="flex w-full flex-col border-t border-gray-600">
      <div className="px-6 py-8 mt-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 md:pr-8 mt-6">
            <div className="flex items-center justify-start">
              <h2 className="text-medium font-medium">{siteConfig.name}</h2>
            </div>
            <span className="text-small text-default-500">
              {siteConfig.description}
            </span>
            <FooterLinks />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {renderList({
                  title: "博客",
                  items: footerNavigation.blog,
                })}
              </div>
              <div className="mt-10 md:mt-0">
                {renderList({
                  title: "Next.js 学习",
                  items: footerNavigation.learning,
                })}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {renderList({
                  title: "Next.js 模板",
                  items: footerNavigation.boilerplate,
                })}
              </div>
              <div className="mt-10 md:mt-0">
                {renderList({
                  title: "独立开发者工具",
                  items: footerNavigation.indieHacker,
                })}
              </div>
            </div>
          </div>
        </div>

        <Divider className="my-8" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <div className="flex space-x-2">
            <div>{`©${currentYear}`}</div>{" "}
            <Link
              href={authors[0].twitter || authors[0].url}
              title={authors[0].name}
              target="_blank"
              prefetch={false}
            >
              {authors[0].name}
            </Link>{" "}
            <div>All rights reserved.</div>
          </div>
          <div>
            {process.env.NEXT_PUBLIC_BEI_AN ? (
              <Link
                href="https://beian.miit.gov.cn/"
                target="_blank"
                prefetch={false}
              >
                {process.env.NEXT_PUBLIC_BEI_AN}
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
