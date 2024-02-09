import TypingTest from '../classes/TypingTest';

const TextContainer = ({
	test,
	isCorrect,
}: {
	test: TypingTest;
	isCorrect: boolean;
}) => {
	return (
		<div className="flex justify-center items-center flex-col">
			<div className="p-4 sm:p-10 bg-white dark:bg-gray-800 w-full rounded-2xl max-w-[900px] font-mono text-lg sm:text-2xl flex items-center mt-10">
				<div className="flex flex-wrap h-20 sm:h-24 overflow-hidden justify-start items-start">
					{test?.getWords().map((word, wordIndex) => (
						<span
							key={word.text + wordIndex}
							id={test.getCurrentIndex() === wordIndex ? 'current-word' : ''}
							className={
								` px-1.5  ${
									test.getCurrentIndex() === wordIndex
										? isCorrect
											? 'current-word bg-slate-200 dark:bg-slate-700 '
											: ' text-red-500 bg-slate-200 dark:bg-slate-700 '
										: ''
								}` +
								`${
									word.status === 'correct'
										? 'text-green-500 dark:text-green-400'
										: word.status === 'incorrect'
										? 'text-red-500 dark:text-red-500'
										: ''
								}`
							}
						>
							{word.text}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default TextContainer;
