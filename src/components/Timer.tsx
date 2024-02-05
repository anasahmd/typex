const Timer = ({ timerText }: { timerText: string }) => {
	return (
		<div className="px-10 py-4 bg-white rounded-2xl text-2xl flex-1 text-center">
			{timerText}
		</div>
	);
};

export default Timer;
