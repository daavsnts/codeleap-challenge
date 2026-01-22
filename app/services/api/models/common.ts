export type WrapperWithPagination<T> = {
	results: T[];
	count: number;
	previous: string | null;
	next: string | null;
};
