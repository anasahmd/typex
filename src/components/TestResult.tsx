import TypingTest from '../classes/TypingTest';

const TestResult = ({
	testDuration,
	test,
}: {
	testDuration: number;
	test: TypingTest;
}) => {
	return (
		<div>
			<div className="flex justify-around text-3xl mx-auto max-w-[800px] mt-10 gap-10">
				<div className="font-semibold bg-white px-5 py-10 rounded-2xl flex gap-4 flex-col flex-1 items-center">
					<div className="font-bold text-5xl">
						{test?.getResults(testDuration).wpm}
					</div>
					<div>WPM</div>
				</div>
				<div className="font-semibold bg-white px-5 py-10 rounded-2xl flex gap-4 flex-col flex-1 items-center">
					<div className="font-bold text-5xl flex items-center gap-2">
						<span>{test?.getResults(testDuration).acc.toFixed(2)}</span>
						<span className="text-2xl">%</span>
					</div>
					<div>Accuracy</div>
				</div>
			</div>
		</div>
	);
};

export default TestResult;
