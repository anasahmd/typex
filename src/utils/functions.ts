export const calculateRemainingTime = (
	startTime: Date,
	duration: number
): string => {
	const currentTimeSeconds = new Date().getTime() / 1000;
	const startTimeSeconds = startTime.getTime() / 1000;
	const difference = currentTimeSeconds - startTimeSeconds;

	if (difference < duration) {
		return new Date((duration - difference) * 1000)
			.toISOString()
			.substring(15, 19);
	} else {
		return '';
	}
};
