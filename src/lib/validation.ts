export function isValidName(name: string) {
	return name.length > 0;
}

export function isValidPassword(password: string) {
	return /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
