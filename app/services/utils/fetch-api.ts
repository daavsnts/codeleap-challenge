function buildHeaders(headers?: HeadersInit) {
	return {
		"Content-Type": "application/json",
		...headers,
	};
}

function buildBody(body?: Record<string, unknown> | FormData) {
	if (body instanceof FormData) return body;
	return JSON.stringify(body ?? {});
}

async function fetchApiWithMethod<T>(
	path: string,
	options: Omit<RequestInit, "body"> & {
		body?: Record<string, unknown> | FormData;
		method: "PATCH" | "POST" | "PUT" | "DELETE";
	},
): Promise<T> {
	const req = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
		...options,
		body: buildBody(options.body),
		headers: buildHeaders(options.headers),
	});

	if (!req.ok) {
		const response = await req.json();
		throw response;
	}

	const contentType = req.headers.get("content-type");

	if (contentType?.includes("application/json")) {
		return (await req.json()) as T;
	}

	return undefined as unknown as T;
}

async function getFromApi<T>(
	path: string,
	defaultValues: T,
	options?: Omit<RequestInit, "body" | "method">,
): Promise<T> {
	const req = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
		...options,
		method: "GET",
		headers: buildHeaders(options?.headers),
	});

	if (!req.ok) {
		const response = await req.json();
		throw response;
	}

	if (req.status === 204) return defaultValues;

	const contentType = req.headers.get("content-type");

	if (contentType?.includes("application/json")) {
		const data = await req.json();
		return (data ?? defaultValues) as T;
	}

	return defaultValues;
}

export { fetchApiWithMethod, getFromApi };
