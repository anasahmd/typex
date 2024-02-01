import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TextContainer from './components/TextContainer';
import Timer from './components/Timer';
import TypingTest from './classes/TypingTest';
import TextInput from './components/TextInput';
import { calculateRemainingTime } from './utils/functions';
import ModeSelector from './components/ModeSelector';

function App() {
	const [test, setTest] = useState<TypingTest | null>(null);
	const [inputText, setInputText] = useState('');
	const [isCorrect, setIsCorrect] = useState(true);
	const [offset, setOffset] = useState<number | undefined>(undefined);
	const [isTextReady, setIsTextReady] = useState<boolean | null>(null);
	const [timeLeft, setTimeLeft] = useState<string>('');
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [testDuration, setTestDuration] = useState(15);
	const [isTestOver, setIsTestOver] = useState(false);

	useEffect(() => {
		if (endTime && !isTestOver) {
			const intervalId = setInterval(() => {
				const result = calculateRemainingTime(endTime);
				setTimeLeft(result);
				if (result === '') {
					setEndTime(null);
					clearInterval(intervalId);
					setIsTestOver(true);
				}
				console.log('hello');
			}, 1000);
			return () => clearInterval(intervalId);
		}
	}, [endTime, isTestOver]);

	const onKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value == ' ') {
			return;
		}

		if (endTime === null) {
			const time = new Date(
				new Date().setSeconds(new Date().getSeconds() + testDuration)
			);
			setEndTime(time);
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
		setIsTextReady(true);
	}, []);

	//Sets initial offsetTop after rendering of words
	useEffect(() => {
		if (isTextReady === null) {
			return;
		}
		setOffset(document.getElementById('current-word')?.offsetTop);
	}, [isTextReady]);

	return (
		<div className="bg-slate-100 min-h-screen">
			<Header />
			<ModeSelector />
			{test && <TextContainer test={test} isCorrect={isCorrect} />}
			<div className="mt-10 flex mx-auto max-w-[800px] gap-10">
				<TextInput
					inputText={inputText}
					onKeyPress={onKeyPress}
					isDisabled={isTestOver}
				/>
				{timeLeft ? (
					<Timer time={timeLeft} />
				) : (
					<Timer
						time={calculateRemainingTime(
							new Date(
								new Date().setSeconds(new Date().getSeconds() + testDuration)
							)
						)}
					/>
				)}
			</div>
			{isTestOver && (
				<div>
					WPM:{test?.getResults(testDuration).wpm} Accuracy:{' '}
					{test?.getResults(testDuration).acc}
				</div>
			)}
		</div>
	);
}

export default App;
