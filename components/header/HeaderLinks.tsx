import { siteConfig } from "@/config/site";
import Link from "next/link";
import React from "react";

const HeaderLinks = () => {
  const links = siteConfig.headerLinks;

  return (
    <div className="flex flex-row items-center">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener norefferer nofollow"
          className="mx-2 flex max-w-[24px] flex-col items-center justify-center"
        >
          {link.icon &&
            React.createElement(link.icon, { className: "text-lg" })}
        </Link>
      ))}
    </div>
  );
};
export default HeaderLinks;
