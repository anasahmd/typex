import TypingTest from '../classes/TypingTest';

const TestResult = ({ test }: { test: TypingTest }) => {
	return (
		<div>
			<div className="flex justify-around text-base sm:text-3xl mx-auto max-w-[900px] mt-10 gap-10 ">
				<div className="font-semibold bg-white dark:bg-gray-800 px-2 py-3 sm:px-5 sm:py-10 rounded-2xl flex gap-2 sm:gap-4 flex-col flex-1 items-center">
					<div className="font-bold text-3xl sm:text-5xl">
						{test?.getResult().wpm}
					</div>
					<div>WPM</div>
				</div>
				<div className="font-semibold bg-white dark:bg-gray-800  px-2 py-3 sm:px-5 sm:py-10 rounded-2xl flex gap-2 sm:gap-4 flex-col flex-1 items-center">
					<div className="font-bold text-3xl sm:text-5xl flex items-center gap-0.5 sm:gap-2">
						<span>
							{Number(Number(test?.getResult().acc.toFixed(2)).toFixed(2))}
						</span>
						<span className="text-base sm:text-2xl">%</span>
					</div>
					<div>Accuracy</div>
				</div>
			</div>
		</div>
	);
};

export default TestResult;
