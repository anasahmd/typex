export const calculateRemainingTime = (time: Date): string => {
	const difference = +new Date(time) - +new Date();
	if (difference > 0) {
		return new Date(difference).toISOString().substring(15, 19);
	} else {
		return '';
	}
};
