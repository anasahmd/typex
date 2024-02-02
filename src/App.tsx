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
import ResetButton from './components/ResetButton';

function App() {
	const [test, setTest] = useState<TypingTest | null>(null);
	const [inputText, setInputText] = useState('');
	const [isCorrect, setIsCorrect] = useState(true);
	const [offset, setOffset] = useState<number | undefined>(undefined);
	const [isTextReady, setIsTextReady] = useState<boolean | null>(null);
	const [timeLeft, setTimeLeft] = useState<string>('');
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [testDuration, setTestDuration] = useState(15);
	const [isTestOver, setIsTestOver] = useState(false);

	useEffect(() => {
		if (startTime && !isTestOver) {
			const intervalId = setInterval(() => {
				const result = calculateRemainingTime(startTime, testDuration);
				setTimeLeft(result);
				if (result === '') {
					setStartTime(null);
					clearInterval(intervalId);
					setIsTestOver(true);
					setInputText('');
				}
				console.log('hello');
			}, 100);
			return () => clearInterval(intervalId);
		}
	}, [startTime, testDuration, isTestOver]);

	const resetTest = () => {
		setTest(new TypingTest());
		setIsTestOver(false);
		setStartTime(null);
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

		if (startTime === null) {
			const time = new Date();
			setStartTime(time);
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
							time={new Date(testDuration * 1000)
								.toISOString()
								.substring(15, 19)}
						/>
					)}
					<ResetButton resetTest={resetTest} />
				</div>
			</div>
		</div>
	);
}

export default App;
