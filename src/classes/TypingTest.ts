import { TestMode, TestOption, modes } from '../utils/modes';
import { WORDS } from '../utils/words';

type wordStatus = 'correct' | 'incorrect' | 'none';
type resultType = { wpm: number; acc: number };

export class Word {
	public text: string;
	public status: wordStatus;

	constructor(text: string) {
		this.text = text;
		this.status = 'none';
	}
}

class TypingTest {
	private words: Word[];
	private currentIndex: number;
	private correct: number;
	private incorrect: number;
	public testOver: boolean;
	private testMode: TestMode;
	private testModeOption: TestOption;
	private startTime: Date | null;
	private endTime: Date | null;
	private wordCount: number;

	constructor(mode: number, modeOption: number) {
		this.currentIndex = 0;
		this.correct = 0;
		this.incorrect = 0;
		this.testOver = false;
		this.testMode = modes[mode];
		this.testModeOption = this.testMode.options[modeOption];
		this.startTime = null;
		this.endTime = null;
		this.wordCount = 0;

		if (this.testMode.type === 'words') {
			this.words = this.generateRandomWords(this.testModeOption);
			this.wordCount += this.testModeOption;
		} else {
			this.words = this.generateRandomWords(50);
			this.wordCount += 50;
		}
	}

	getCurrentIndex(): number {
		return this.currentIndex;
	}

	private generateRandomWords(count: number): Word[] {
		const randomWords = [];
		for (let i = 0; i < count; i++) {
			const randomIndex = Math.floor(Math.random() * WORDS.length);
			const randomWord = new Word(WORDS[randomIndex]);
			randomWords.push(randomWord);
		}
		return randomWords;
	}

	private generateRandomWord(): Word {
		return new Word(WORDS[Math.floor(Math.random() * WORDS.length)]);
	}

	getWords(): Word[] {
		return this.words;
	}

	setStartTime(startTime: Date) {
		this.startTime = startTime;
		if (this.testMode.type === 'time') {
			this.endTime = new Date(
				this.startTime.getTime() + this.testModeOption * 1000
			);
		}
	}

	getStartTime() {
		return this.startTime;
	}

	getUserInput(text: string) {
		if (this.words[this.currentIndex].text === text) {
			this.correct++;
			this.words[this.currentIndex].status = 'correct';
		} else {
			this.incorrect++;
			this.words[this.currentIndex].status = 'incorrect';
		}
		this.currentIndex++;

		if (this.testMode.type === 'time') {
			const word = this.generateRandomWord();
			this.wordCount++;
			this.words.push(word);
		} else if (this.testMode.type === 'words') {
			if (this.currentIndex >= this.words.length) {
				this.endTime = new Date();
			}
		}
	}

	getResult(): resultType {
		let testSeconds = 0;
		if (this.startTime !== null) {
			const startTimeSeconds = this.startTime.getTime() / 1000;
			if (this.endTime !== null) {
				const endTimeSeconds = this.endTime.getTime() / 1000;
				testSeconds = endTimeSeconds - startTimeSeconds;
			} else {
				const currentTimeSeconds = new Date().getTime() / 1000;
				testSeconds = currentTimeSeconds - startTimeSeconds;
			}

			return {
				wpm: Math.ceil((this.correct / testSeconds) * 60),
				acc: (this.correct * 100) / (this.correct + this.incorrect) || 0,
			};
		}
		return {
			wpm: 0,
			acc: 0,
		};
	}

	getTimeLeft(): string {
		if (this.testMode.type === 'time') {
			if (this.startTime !== null && this.endTime !== null) {
				const currentTimeSeconds = new Date().getTime() / 1000;
				const endTimeSeconds = this.endTime.getTime() / 1000;
				const difference = endTimeSeconds - currentTimeSeconds;
				if (difference > 0) {
					return new Date(difference * 1000).toISOString().substring(15, 19);
				} else {
					return '0:00';
				}
			} else {
				return new Date(this.testModeOption * 1000)
					.toISOString()
					.substring(15, 19);
			}
		} else {
			return `${this.correct + this.incorrect}/${this.wordCount}`;
		}
	}

	isTestOver(): boolean {
		if (this.testMode.type === 'time') {
			if (this.startTime !== null && this.endTime !== null) {
				//test has started
				const currentTimeSeconds = new Date().getTime() / 1000;
				const endTimeSeconds = this.endTime.getTime() / 1000;
				const difference = endTimeSeconds - currentTimeSeconds;
				if (difference >= 0) {
					//test in progress
					return false;
				} else {
					//test ended
					return true;
				}
			} else {
				//test hasn't started yet
				return false;
			}
		} else {
			if (this.endTime !== null) {
				// set endtime in getUserInput
				return true;
			} else {
				return false;
			}
		}
	}

	removeTypedWords() {
		this.words = this.words.slice(this.currentIndex, this.words.length);
		this.currentIndex = 0;
	}
}

export default TypingTest;
