import Link from "next/link";

const HeaderMenu = () => {
  return (
    <>
      <Link href="/" title="首页" className="link-default">
        首页
      </Link>
      <div className="hidden md:block text-gray-600">|</div>
      <Link href="/make-a-friend" title="Hi there" className="link-default">
        Hi there
      </Link>
      <div className="hidden md:block text-gray-600">|</div>
      <Link href="/rss.xml" title="RSS" className="link-default">
        RSS
      </Link>
      <div className="hidden md:block text-gray-600">|</div>
      <Link
        href="https://gapis.money"
        title="信息差周刊"
        className="link-default"
        target="_blank"
      >
        信息差周刊
      </Link>
    </>
  );
};

export default HeaderMenu;
