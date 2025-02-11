/**
 * Returns a human-readable string representing the time elapsed since the given date.
 *
 * @param createdAt - The date or string representation of the date to compare with the current date.
 * @returns A string describing the time difference in the largest possible unit (seconds, minutes, hours, days, weeks, or years).
 */

export function timeAgo(createdAt: Date | string): string {
    const now = new Date();
    const difference = Math.abs(now.getTime() - new Date(createdAt).getTime());

    const seconds = difference / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const years = weeks / 52;

    if (seconds < 60) {
        return `${Math.round(seconds)} seconds ago`;
    } else if (minutes < 60) {
        return `${Math.round(minutes)} minutes ago`;
    } else if (hours < 24) {
        return `${Math.round(hours)} hours ago`;
    } else if (days < 7) {
        return `${Math.round(days)} days ago`;
    } else if (weeks < 52) {
        return `${Math.round(weeks)} weeks ago`;
    } else {
        return `${Math.round(years)} years ago`;
    }
}

/**
 * Formats a duration given in seconds into a string in the format "mm:ss".
 *
 * @param seconds - The duration in seconds.
 * @returns A string in the format "mm:ss" representing the given duration.
 */
export function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

