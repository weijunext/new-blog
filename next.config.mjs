import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};
/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: false,
  defaultLang: {
    block: "typescript",
    inline: "bash",
  },
};

const withMDX = createMDX({});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
