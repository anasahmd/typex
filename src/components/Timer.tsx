const Timer = ({ time }: { time: string }) => {
	return (
		<div className="px-10 py-4 bg-white rounded-2xl text-lg">
			{time ? `${time}` : '1:00'}
		</div>
	);
};

export default Timer;
