"use client";

import { Divider, Link } from "@nextui-org/react";
import React from "react";

import FooterLinks from "@/components/footer/FooterLinks";
import { siteConfig } from "@/config/site";

const footerNavigation = {
  blog: [
    { name: "J实验室", href: "https://weijunext.com/", target: "_self" },
    { name: "关于我", href: "/make-a-friend", target: "_self" },
    { name: "赞助榜", href: "/thanks", target: "_self" },
    { name: "友链", href: "/links", target: "_self" },
    {
      name: "版权声明",
      href: "https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh-hans",
      nofollow: true,
    },
  ],
  openSource: [
    { name: "Smart Excel AI", href: "https://smartexcel.cc/" },
    { name: "Next.js Practice", href: "https://nextjs.weijunext.com/" },
  ],
  boilerplate: [
    { name: "Next.js Clean Starter", href: "https://starter.weijunext.com/" },
    {
      name: "Landing Page Boilerplate",
      href: "https://landingpage.weijunext.com/?utm_source=weijunext",
    },
    { name: "Weekly Boilerplate", href: "https://weekly.weijunext.com/" },
  ],
  indieHacker: [
    {
      name: "PH Copilot",
      href: "https://PHCopilot.AI/?utm_source=weijunext",
    },
    {
      name: "独立开发者出海周刊",
      href: "https://gapis.money/?utm_source=weijunext",
    },
    {
      name: "Indie Hacker Tools",
      href: "https://github.com/weijunext/indie-hacker-tools",
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
        nofollow?: boolean;
      }[];
    }) => (
      <div>
        <h3 className="text-small font-semibold">{title}</h3>
        <ul className="mt-6 space-y-4">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                className="text-default-500"
                href={item.href}
                title={item.name}
                size="sm"
                target={item.target || "_blank"}
                rel={item.nofollow ? "noopener noreferrer nofollow" : ""}
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
              <h1 className="text-medium font-medium">{siteConfig.name}</h1>
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
                  title: "开源项目",
                  items: footerNavigation.openSource,
                })}
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                {renderList({
                  title: "Next.js模板",
                  items: footerNavigation.boilerplate,
                })}
              </div>
              <div className="mt-10 md:mt-0">
                {renderList({
                  title: "独立开发者出海",
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
            >
              {authors[0].name}
            </Link>{" "}
            <div>All rights reserved.</div>
          </div>
          <div>
            {process.env.NEXT_PUBLIC_BEI_AN ? (
              <Link href="https://beian.miit.gov.cn/" target="_blank">
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
