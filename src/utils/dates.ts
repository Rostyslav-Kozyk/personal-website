export function formatDate(
    date: Date,
): string {
    return date.toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        },
    );
}

export function formatMonthYear(
    date: Date,
): string {
    return date.toLocaleDateString(
        "en-GB",
        {
            month: "long",
            year: "numeric",
        },
    );
}