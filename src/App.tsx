import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TextContainer from './components/TextContainer';
import Timer from './components/Timer';
import TypingTest from './classes/TypingTest';
import TextInput from './components/TextInput';
import { calculateRemainingTime } from './utils/functions';
import ModeSelector from './components/ModeSelector';
import TestResult from './components/TestResult';

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
					setInputText('');
				}
				console.log('hello');
			}, 100);
			return () => clearInterval(intervalId);
		}
	}, [endTime, isTestOver]);

	const resetTest = () => {
		setTest(new TypingTest());
		setIsTestOver(false);
		setEndTime(null);
		setTimeLeft('');
		setInputText('');
		setIsCorrect(true);
	};

	useEffect(() => {
		resetTest();
	}, [testDuration]);

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
			<ModeSelector setTestDuration={setTestDuration} />
			{test && isTestOver ? (
				<TestResult testDuration={testDuration} test={test} />
			) : (
				test && <TextContainer test={test} isCorrect={isCorrect} />
			)}
			<div className="mt-10 flex mx-auto max-w-[900px] gap-10 ">
				<div className="w-full">
					<TextInput
						inputText={inputText}
						onKeyPress={onKeyPress}
						isDisabled={isTestOver}
					/>
				</div>
				<div className="flex w-full gap-10">
					{timeLeft ? (
						<Timer time={timeLeft} />
					) : isTestOver ? (
						<Timer time={`0:00`} />
					) : (
						<Timer
							time={calculateRemainingTime(
								new Date(
									new Date().setSeconds(new Date().getSeconds() + testDuration)
								)
							)}
						/>
					)}
					<button
						type="button"
						className=" rounded-2xl px-4 py-2  bg-cyan-400 flex-1"
						onClick={resetTest}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 mx-auto text-cyan-950"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
