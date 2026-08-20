import rss from "@astrojs/rss";

import {
    getPublishedArticles,
} from "../utils/content";

export async function GET(
    context: {
        site?: URL;
    },
) {
    const articles =
        await getPublishedArticles();

    if (!context.site) {
        throw new Error(
            "The site option must be configured in astro.config.mjs.",
        );
    }

    return rss({
        title:
            "Rostyslav Kozyk — Engineering Articles",

        description:
            "Articles about software engineering, test automation and architecture decisions.",

        site: context.site,

        items: articles.map(
            (article) => ({
                title:
                    article.data.title,

                description:
                    article.data.description,

                pubDate:
                    article.data.publishedAt,

                link:
                    `/articles/${article.id}`,
            }),
        ),
    });
}