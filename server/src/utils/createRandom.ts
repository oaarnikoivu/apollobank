const createRandomNumber = (n: number): string => {
	let add = 1,
		max = 12 - add;

	if (n > max) {
		return createRandomNumber(max) + createRandomNumber(n - max);
	}

	max = Math.pow(10, n + add);
	let min = max / 10;
	let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return ("" + randomNumber).substring(add);
};

export const createRandomIbanCode = () => {
	return `GB${createRandomNumber(2)} AP0L ${createRandomNumber(4)} ${createRandomNumber(
		4
	)} ${createRandomNumber(4)} ${createRandomNumber(2)}`;
};

export const createRandomSortCode = () => {
	let randomNumber = Math.floor(Math.random() * 899999 + 100000);
	return randomNumber
		.toString()
		.match(/.{1,2}/g)
		?.join("-");
};
