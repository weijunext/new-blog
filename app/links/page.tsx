import Comments from "@/components/Comments";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";

export async function generateMetadata() {
  return {
    ...siteConfig,
    title: `友链 | ${siteConfig.name}`,
  };
}

export default async function Page() {
  return (
    <div className="flex flex-row w-full pt-12 justify-center">
      <div className="w-full md:w-4/6 px-2 md:px-12">
        <article>
          <h1>友链📮</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {links.map((i) => (
              <Card className="pt-2 pb-4" key={i.title}>
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src={i.logo} />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <span className="text-small font-semibold leading-none text-default-600">
                        {i.title}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={i.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <Button
                      color="primary"
                      radius="full"
                      size="sm"
                      variant="solid"
                    >
                      Visit
                    </Button>
                  </Link>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                  <p>{i.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </article>

        <Separator className="my-12 bg-gray-600" />
        <Comments />
      </div>
    </div>
  );
}

const links = [
  {
    logo: "https://kaiyi.cool/_astro/portrait.lBf0EGlL_1llb4H.webp",
    title: "Kai",
    description: "",
    link: "https://kaiyi.cool/",
  },
  {
    logo: "https://icon.horse/icon/simonme.netlify.app",
    title: "Simon He",
    description: "Front-end development, Open source",
    link: "https://simonme.netlify.app/",
  },
];
