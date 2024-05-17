import Link from "next/link";

const HeaderMenu = () => {
  return (
    <>
      <Link href="/" className="link-default">
        首页
      </Link>
      <div className="hidden md:block text-gray-600">|</div>
      <Link href="/make-a-friend" className="link-default">
        Hi there
      </Link>
      <div className="hidden md:block text-gray-600">|</div>
      <Link href="https://gapis.money" className="link-default" target="_blank">
        信息差周刊
      </Link>
    </>
  );
};

export default HeaderMenu;
