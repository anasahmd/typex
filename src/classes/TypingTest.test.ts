// import { expect, test } from 'vitest';
// import TypingTest from './TypingTest';

// test('Adds 1 letter in the array for each input', () => {
// 	const test = new TypingTest(0, 1);
// 	expect(test.getWords().length).toBe(30);
// 	test.getUserInput('hello');
// 	expect(test.getWords().length).toBe(31);
// });

// test('Input and result logic', () => {
// 	const test = new TypingTest(30);
// 	test.getUserInput(test.getWords()[0].text);
// 	expect(test.getResults(1)).toStrictEqual({ wpm: 60, acc: 100 });
// 	test.getUserInput(test.getWords()[1].text);
// 	expect(test.getResults(1)).toStrictEqual({ wpm: 120, acc: 100 });
// });

// test('Removes typed word', () => {
// 	const test = new TypingTest(30);
// 	test.getUserInput('hello');
// 	test.getUserInput('bye');
// 	expect(test.getWords().length).toBe(32);
// 	test.removeTypedWords();
// 	expect(test.getWords().length).toBe(30);
// });
