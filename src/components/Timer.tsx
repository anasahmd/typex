const Timer = ({ timerText }: { timerText: string }) => {
	return (
		<div className="px-10 py-3 sm:py-4 bg-white rounded-2xl text-lg sm:text-2xl flex-1 text-center dark:bg-gray-800">
			{timerText}
		</div>
	);
};

export default Timer;
