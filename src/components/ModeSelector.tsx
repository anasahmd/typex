const allTimeModes: number[] = [15, 30, 60, 120];

const ModeButton = ({
	setTestDuration,
	time,
}: {
	setTestDuration: React.Dispatch<React.SetStateAction<number>>;
	time: number;
}) => {
	return (
		<span
			className="bg-white px-4 py-2 rounded-2xl cursor-pointer"
			onClick={() => {
				setTestDuration(time);
			}}
		>
			{new Date(time * 1000).toISOString().substring(15, 19)}
		</span>
	);
};

const ModeSelector = ({
	setTestDuration,
}: {
	setTestDuration: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="flex gap-4 mt-32 max-w-[900px] mx-auto justify-end text-xl">
			{allTimeModes.map((item) => (
				<ModeButton setTestDuration={setTestDuration} time={item} />
			))}
		</div>
	);
};

export default ModeSelector;
