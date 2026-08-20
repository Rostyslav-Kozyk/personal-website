import type {
    APIRoute,
} from "astro";

export const GET: APIRoute = ({
    site,
}) => {
    if (!site) {
        return new Response(
            "User-agent: *\nAllow: /\n",
            {
                headers: {
                    "Content-Type":
                        "text/plain",
                },
            },
        );
    }

    const sitemapURL = new URL(
        "sitemap-index.xml",
        site,
    );

    const content = [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${sitemapURL.href}`,
        "",
    ].join("\n");

    return new Response(
        content,
        {
            headers: {
                "Content-Type":
                    "text/plain",
            },
        },
    );
};