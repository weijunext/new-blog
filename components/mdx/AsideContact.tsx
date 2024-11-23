import { cn } from "@/lib/utils";
import Link from "next/link";

interface AsideProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
  slug?: string;
}

export function AsideContact({
  children,
  icon,
  type = "default",
  slug = "/",
  ...props
}: AsideProps) {
  return (
    <div
      className={cn(
        "flex border-5 py-3 px-4 ms-2 ms-md-0 my-10 rounded rounded-1 shadow",
        "bg-[#6edff633] border-[#6edff633] border-l-[#6edff6]"
      )}
      {...props}
    >
      <div className="rounded rounded-1 text-center h-8 w-8 bg-[#6edff6] text-2xl relative top-[-30px] left-[-30px]">
        {icon || "💡"}
      </div>
      <div>
        <div className="mb-4">
          本文首发于我的博客
          <Link
            href={slug}
            title="首发地址"
            target="_blank"
            className="link-underline"
            prefetch={false}
          >
            J实验室
          </Link>
        </div>
        欢迎加入「
        <Link
          href="/make-a-friend"
          title="🌍全栈出海交流群"
          target="_blank"
          className="link-underline"
          prefetch={false}
        >
          🌍全栈出海交流群
        </Link>
        」 和「
        <Link
          href="/make-a-friend"
          title="🌍全栈出海交流群"
          target="_blank"
          className="link-underline"
          prefetch={false}
        >
          🧑‍💻Next.js 技术交流群
        </Link>
        」, 一起交流出海信息和全栈技术
      </div>
    </div>
  );
}
