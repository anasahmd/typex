import { ChangeEvent, useEffect, useState } from 'react';
import TypingTest from '../classes/TypingTest';

const TextContainer = () => {
	const [test, setTest] = useState<TypingTest | null>(null);
	const [inputText, setInputText] = useState('');
	const [isCorrect, setIsCorrect] = useState(true);
	const [offset, setOffset] = useState<number | undefined>(undefined);
	const [isReady, setIsReady] = useState<boolean | null>(null);

	const onKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value == ' ') {
			return;
		}

		if (e.target.value.slice(-1) === ' ') {
			test!.getUserInput(e.target.value.slice(0, e.target.value.length - 1));
			const nextWord = document.getElementById('current-word')
				?.nextElementSibling as HTMLElement;

			if (nextWord && nextWord.offsetTop > offset!) {
				test?.removeTypedWords();
			}
			setInputText('');
			setIsCorrect(true);
		} else {
			setInputText(e.target.value);
			if (
				test
					?.getWords()
					[test.getCurrentIndex()].text.slice(0, e.target.value.length) ===
				e.target.value
			) {
				setIsCorrect(true);
			} else {
				setIsCorrect(false);
			}
		}
	};

	useEffect(() => {
		setTest(new TypingTest());
		setIsReady(true);
	}, []);

	//Sets initial offsetTop after rendering of words
	useEffect(() => {
		if (isReady === null) {
			return;
		}
		setOffset(document.getElementById('current-word')?.offsetTop);
	}, [isReady]);

	return (
		<div className="flex justify-center items-center flex-col pt-24">
			<div className="p-10 bg-white rounded-2xl w-4/5 max-w-[1000px] font-mono text-xl flex justify-center items-center">
				<div className="flex flex-wrap gap-2 h-24 overflow-hidden">
					{test?.getWords().map((word, index) => (
						<span
							key={word.id}
							id={test.getCurrentIndex() === index ? 'current-word' : ''}
							className={
								`${
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
			<input
				className="mt-10 p-4"
				type="text"
				value={inputText}
				onChange={(e) => onKeyPress(e)}
			/>
		</div>
	);
};

export default TextContainer;
