import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { WORDS } from '../utils/words';

const TextContainer = () => {
	const [textArray, setTextArray] = useState<string[]>([]);
	const [currentText, setCurrentText] = useState<string>('');
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isCorrect, setIsCorrect] = useState<boolean>(true);
	const currentWordRef = useRef<HTMLElement | null>(null);
	const [offSet, setOffSet] = useState<number>(0);

	const generateRandomWords = (count: number): string[] => {
		const randomWords = [];
		for (let i = 0; i < count; i++) {
			const randomIndex = Math.floor(Math.random() * WORDS.length);
			randomWords.push(WORDS[randomIndex]);
		}
		return randomWords;
	};

	const generateRandomWord = (): string => {
		return WORDS[Math.floor(Math.random() * WORDS.length)];
	};

	const onKeyPress = (e: ChangeEvent<HTMLTextAreaElement>) => {
		console.log(currentWordRef.current?.compareDocumentPosition);

		if (e.target.value.slice(-1) === ' ') {
			setOffSet(document.getElementById('current-word')!.offsetTop);
			setCurrentIndex(currentIndex + 1);
			setCurrentText('');
			setTextArray((prevTextArray) => [...prevTextArray, generateRandomWord()]);
			setIsCorrect(true);
			console.log(offSet);

			if (document.getElementById('current-word')!.offsetTop > offSet) {
				setTextArray((prevTextArray) => prevTextArray.splice(0, currentIndex));
			}
		} else {
			setCurrentText(e.target.value);
			if (
				textArray[currentIndex].substring(0, e.target.value.length) ===
				e.target.value
			) {
				setIsCorrect(true);
			} else {
				setIsCorrect(false);
			}
		}
	};

	useEffect(() => {
		setTextArray(generateRandomWords(100));
	}, []);

	return (
		<div className="flex justify-center items-center flex-col ">
			<div className="p-10 bg-white rounded-2xl w-[1000px] font-mono text-xl flex justify-center items-center">
				<div className="flex flex-wrap gap-2  h-24 overflow-hidden ">
					<div className="bg-black w-0.5 h-7"></div>
					{textArray.map((text, index) => (
						<span
							key={index}
							id={currentIndex === index ? 'current-word' : ''}
							className={
								currentIndex === index ? 'current-word bg-slate-400' : ''
							}
							ref={currentIndex === index ? currentWordRef : null}
						>
							{text}
						</span>
					))}
				</div>
			</div>
			<input
				className="mt-10 p-4"
				type="text"
				value={currentText}
				onChange={(e) => onKeyPress(e)}
			/>
		</div>
	);
};

export default TextContainer;
