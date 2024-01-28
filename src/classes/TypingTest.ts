import { WORDS } from '../utils/words';
import { v4 as uuidv4 } from 'uuid';

type wordStatus = 'correct' | 'incorrect' | 'none';
type resultType = { wpm: number; acc: number };

export class Word {
	public text: string;
	public status: wordStatus;
	public id: string;

	constructor(text: string) {
		this.id = uuidv4();
		this.text = text;
		this.status = 'none';
	}
}

class TypingTest {
	private words: Word[];
	private currentIndex: number;
	private correct: number;
	private incorrect: number;

	constructor(words = 60) {
		this.words = this.generateRandomWords(words);
		this.currentIndex = 0;
		this.correct = 0;
		this.incorrect = 0;
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

	getUserInput(text: string) {
		if (this.words[this.currentIndex].text === text) {
			this.correct++;
			this.words[this.currentIndex].status = 'correct';
		} else {
			this.incorrect++;
			this.words[this.currentIndex].status = 'incorrect';
		}
		this.currentIndex++;
		const word = this.generateRandomWord();
		this.words.push(word);
	}

	getResults(seconds = 60): resultType {
		return {
			wpm: (this.correct / seconds) * 60,
			acc: (this.correct * 100) / (this.correct + this.incorrect),
		};
	}

	removeTypedWords() {
		this.words = this.words.slice(this.currentIndex, this.words.length);
		this.currentIndex = 0;
	}
}

export default TypingTest;
