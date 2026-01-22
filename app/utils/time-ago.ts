export function timeAgo(dateString: string): string {
	const date = new Date(dateString);
	const now = new Date();

	const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (seconds <= 0) {
		return "right now";
	}

	if (seconds < 60) {
		if (seconds < 2) return `1 second ago`;
		return `${seconds} seconds ago`;
	}

	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		if (minutes < 2) return `1 minute ago`;
		return `${minutes} minutes ago`;
	}

	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		if (hours < 2) return `1 hour ago`;
		return `${hours} hours ago`;
	}

	const days = Math.floor(hours / 24);
	if (days < 2) return `1 day ago`;
	return `${days} days ago`;
}
