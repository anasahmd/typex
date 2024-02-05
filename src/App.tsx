import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import TextContainer from './components/TextContainer';
import Timer from './components/Timer';
import TypingTest from './classes/TypingTest';
import TextInput from './components/TextInput';
import ModeSelector from './components/ModeSelector';
import TestResult from './components/TestResult';
import ResetButton from './components/ResetButton';
import { useLocalStorage } from './utils/useLocalStorage';

function App() {
	const [test, setTest] = useState<TypingTest | null>(null);
	const [inputText, setInputText] = useState('');
	const [isCorrect, setIsCorrect] = useState(true);
	const [offset, setOffset] = useState<number | undefined>(undefined);
	const [isTextReady, setIsTextReady] = useState<boolean | null>(null);
	const [timerText, setTimerText] = useState('');
	const [testMode, setTestMode] = useLocalStorage('mode', [0, 0]);

	useEffect(() => {
		if (test !== null) {
			const intervalId = setInterval(() => {
				setTimerText(test.getTimeLeft());
				if (test.isTestOver()) {
					clearInterval(intervalId);
					setInputText('');
					setIsCorrect(true);
				}
			}, 100);
			return () => clearInterval(intervalId);
		}
	}, [test]);

	const resetTest = useCallback(() => {
		setTest(new TypingTest(testMode[0], testMode[1]));
		setInputText('');
		setIsCorrect(true);
		setIsTextReady(true);
	}, [testMode]);

	const onKeyPress = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value == ' ' || test?.isTestOver()) {
			return;
		}

		if (test?.getStartTime() === null) {
			const time = new Date();
			test.setStartTime(time);
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
		resetTest();
	}, [resetTest, testMode]);

	//Sets initial offsetTop after rendering of words
	useEffect(() => {
		if (isTextReady === null) {
			return;
		}
		setOffset(document.getElementById('current-word')?.offsetTop);
	}, [isTextReady]);

	return (
		<div className="bg-slate-100 min-h-screen min-w-full">
			<Header />
			<ModeSelector testMode={testMode} setTestMode={setTestMode} />
			{test?.isTestOver() ? (
				<TestResult test={test} />
			) : (
				test && <TextContainer test={test} isCorrect={isCorrect} />
			)}
			<div className="mt-10 flex mx-auto max-w-[900px] gap-10 ">
				<div className="w-full">
					{test && (
						<TextInput
							inputText={inputText}
							onKeyPress={onKeyPress}
							isDisabled={test?.getStartTime() !== null && test?.isTestOver()}
						/>
					)}
				</div>
				<div className="flex w-full gap-10">
					<Timer timerText={timerText} />
					<ResetButton resetTest={resetTest} />
				</div>
			</div>
		</div>
	);
}

export default App;
