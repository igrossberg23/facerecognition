export interface BoundingBox {
	id: string;
	left: number;
	right: number;
	top: number;
	bottom: number;
}

export interface User {
	email: string;
	entries: number;
	id: number;
	name: string;
}
