import HeaderLinks from "@/components/header/HeaderLinks";
import SearchBar from "@/components/header/SearchBar";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  return (
    <header className="flex z-40 w-full h-auto py-2 px-2 items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <nav className="z-40 flex px-0 sm:px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-[1024px]">
        <div className="flex items-center md:gap-x-12">
          <Link
            href="/"
            className="flex items-center space-x-1 font-bold"
            title={siteConfig.description}
          >
            <Image
              alt={siteConfig.name}
              src="/logo.svg"
              className="w-8 h-8"
              width={24}
              height={24}
            />
            <span className="text-gray-100 hidden sm:block">
              {siteConfig.name}
            </span>
          </Link>
          <div className="hidden md:flex md:gap-x-6"></div>
        </div>

        <div className="items-center gap-4 ml-4 hidden sm:flex h-12 w-full max-w-fit rounded-full bg-content2 px-4 dark:bg-content1">
          <Link href="/" className="link-default">
            首页
          </Link>
          <div className="text-gray-600">|</div>
          <Link href="/make-a-friend" className="link-default">
            Hi there
          </Link>
          {/* <div className="text-gray-600">|</div>
          <Link>赞助榜</Link> */}
        </div>

        <div className="items-center flex h-12 w-full max-w-fit rounded-full px-2 bg-content1">
          <SearchBar />
          <HeaderLinks />
          {/* <ThemedButton /> */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
