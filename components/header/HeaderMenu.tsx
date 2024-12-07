import Link from "next/link";

const HeaderMenu = () => {
  return (
    <>
      <Link href="/" title="首页" className="link-default" prefetch={false}>
        首页
      </Link>
      <div className="hidden md:block text-gray-600">|</div>
      <Link
        href="/make-a-friend"
        title="Hi there"
        className="link-default"
        prefetch={false}
      >
        Hi there
      </Link>
      <div className="hidden md:block text-gray-600">|</div>
      <Link
        href="https://nextjscn.org/"
        title="Next.js中文文档"
        className="link-default"
        target="_blank"
        prefetch={false}
      >
        Next.js中文文档
      </Link>
      <div className="hidden md:block text-gray-600">|</div>
      <Link
        href="https://gapis.money"
        title="信息差周刊"
        className="link-default"
        target="_blank"
        prefetch={false}
      >
        出海周刊
      </Link>
    </>
  );
};

export default HeaderMenu;
