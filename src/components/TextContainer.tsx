import { ChangeEvent, useEffect, useState } from 'react';
import TypingTest, { Word } from '../classes/TypingTest';

const TextContainer = () => {
	const [test, setTest] = useState<TypingTest | null>(null);
	const [inputText, setInputText] = useState('');

	const onKeyPress = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.value.slice(-1) === ' ') {
			test!.getUserInput(e.target.value.slice(0, e.target.value.length - 1));
			setInputText('');
		} else {
			setInputText(e.target.value);
		}
	};
	useEffect(() => {
		setTest(new TypingTest());
	}, []);

	return (
		<div className="flex justify-center items-center flex-col ">
			<div className="p-10 bg-white rounded-2xl w-[1000px] font-mono text-xl flex justify-center items-center">
				<div className="flex flex-wrap gap-2 h-24 overflow-hidden  ">
					{/* <div className="bg-black w-0.5 h-7"></div> */}
					{test?.getWords().map((word, index) => (
						<span
							key={index}
							className={
								`${
									test.getCurrentIndex() === index
										? 'current-word bg-slate-200'
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
