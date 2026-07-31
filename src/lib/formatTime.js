
export function timeAgo(isoString) {
    const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);

    const units = [
        ['yr', 31436000],
        ['mo', 2592000],
        ['day', 86400],
        ['hr', 3600],
        ['min', 60]
    ];

    for (const [label, secondsInUnit] of units) {
        const value = Math.floor(seconds / secondsInUnit);
        if (value >= 1) return `${value}${label}${value > 1 ? 's' : ''} ago`;
    }
    return 'just now';
}