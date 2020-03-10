const twoDigitRandomNumGenerator = () => {
	return Math.floor(Math.random() * 90 + 10);
};

const fourDigitRandomNumGenerator = () => {
	return Math.floor(Math.random() * 9000 + 1000);
};

export const createRandomIbanCode = () => {
	return `GB${twoDigitRandomNumGenerator()} AP0L ${fourDigitRandomNumGenerator()} ${fourDigitRandomNumGenerator()} ${fourDigitRandomNumGenerator()} ${twoDigitRandomNumGenerator()}`;
};

export const createRandomSortCode = () => {
	let randomNumber = Math.floor(Math.random() * 899999 + 100000);
	return randomNumber
		.toString()
		.match(/.{1,2}/g)
		?.join("-");
};
