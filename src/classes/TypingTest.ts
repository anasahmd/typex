import { WORDS } from '../utils/words';

type wordStatus = 'correct' | 'incorrect' | 'none';
type resultType = { wpm: number; acc: number };

class Word {
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

	constructor(words: number) {
		this.words = this.generateRandomWords(words);
		this.currentIndex = 0;
		this.correct = 0;
		this.incorrect = 0;
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
		} else {
			this.incorrect++;
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
}

export default TypingTest;
