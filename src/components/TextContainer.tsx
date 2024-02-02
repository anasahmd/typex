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
			<div className="p-10 bg-white rounded-2xl w-4/5 max-w-[900px] font-mono text-2xl flex justify-center items-center mt-10">
				<div className="flex flex-wrap h-24 overflow-hidden">
					{test?.getWords().map((word, index) => (
						<span
							key={word.id}
							id={test.getCurrentIndex() === index ? 'current-word' : ''}
							className={
								`px-2 ${
									test.getCurrentIndex() === index
										? isCorrect
											? 'current-word bg-slate-200'
											: 'bg-red-400'
										: ''
								}` +
								`${
									word.status === 'correct'
										? 'text-green-600'
										: word.status === 'incorrect'
										? 'text-red-600'
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
