import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const blog = await getCollection("blog");
  const papers = await getCollection("papers");
  const references = await getCollection("references");

  const posts = [...blog, ...papers, ...references];
  posts.sort((a, b) => b.data.pubDate - a.data.pubDate);

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: entry.data.title,
      pubDate: entry.data.pubDate,
      description: entry.data.description,
      link: `/$[entry.collection}/${entry.id}/`,
    })),
    customData:
      '\
       <atom:link href="${context.site}rss.xml"\
       rel="self" type = "application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" />\
       <lastBuildDate>${lastBuildDate}</lastBuildDate>',
  });
}
