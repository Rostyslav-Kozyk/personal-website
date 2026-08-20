import {
    getCollection,
    type CollectionEntry,
} from "astro:content";

type Article = CollectionEntry<"articles">;
type Project = CollectionEntry<"projects">;

export function normalizeTag(
    tag: string,
): string {
    return tag
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
}

export async function getPublishedArticles(): Promise<Article[]> {
    const articles = await getCollection(
        "articles",
        ({ data }) => !data.draft,
    );

    return articles.sort(
        (a, b) =>
            b.data.publishedAt.valueOf() -
            a.data.publishedAt.valueOf(),
    );
}

export async function getLatestArticles(
    limit = 3,
): Promise<Article[]> {
    const articles = await getPublishedArticles();

    return articles.slice(0, limit);
}

export async function getRelatedArticles(
    projectId: string,
): Promise<Article[]> {
    const articles = await getPublishedArticles();

    return articles.filter(
        ({ data }) =>
            data.project?.id === projectId,
    );
}

export async function getProjects(): Promise<Project[]> {
    const projects = await getCollection("projects");

    return projects.sort(
        (a, b) =>
            b.data.createdAt.valueOf() -
            a.data.createdAt.valueOf(),
    );
}

export async function getFeaturedProject(): Promise<
    Project | undefined
> {
    const projects = await getProjects();

    return projects.find(
        ({ data }) => data.featured,
    );
}

export async function getTags(): Promise<string[]> {
    const articles = await getPublishedArticles();

    const tags = new Map<string, string>();

    for (const article of articles) {
        for (const tag of article.data.tags) {
            const normalized = normalizeTag(tag);

            if (!tags.has(normalized)) {
                tags.set(normalized, tag);
            }
        }
    }

    return Array.from(tags.values()).sort(
        (a, b) => a.localeCompare(b),
    );
}

export async function getArticlesByTag(
    tag: string,
): Promise<Article[]> {
    const articles = await getPublishedArticles();

    return articles.filter((article) =>
        article.data.tags.some(
            (articleTag) =>
                normalizeTag(articleTag) === tag,
        ),
    );
}

export async function getArticleNavigation(
    currentArticleId: string,
): Promise<{
    previous?: Article;
    next?: Article;
}> {
    const articles =
        await getPublishedArticles();

    const index = articles.findIndex(
        ({ id }) => id === currentArticleId,
    );

    if (index === -1) {
        return {};
    }

    return {
        previous: articles[index + 1],
        next: articles[index - 1],
    };
}