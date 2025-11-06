import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export const GET = async (context) => {
  const collections = await Promise.all([
    getCollection("blog"),
    getCollection("papers"),
    getCollection("references"),
  ]);

  const posts = collections.flat().sort((a, b) => {
    const dateA = a.data.pubDate ? new Date(a.data.pubDate).getTime() : 0;
    const dateB = b.data.pubDate ? new Date(b.data.pubDate).getTime() : 0;
    return dateB - dateA;
  });

  const lastBuildDate = new Date().toUTCString();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${post.collection}/${post.id}/`.replace(/\/+$/, "/"),
    })),
    customData: `
      <atom:link
        href="${context.site}rss.xml"
        rel="self"
        type="application/rss+xml"
        xmlns:atom="http://www.w3.org/2005/Atom"
      />
      <lastBuildDate>${lastBuildDate}</lastBuildDate>
    `,
  });
};
