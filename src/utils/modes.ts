enum TimeOptions {
	Option15 = 15,
	Option30 = 30,
	Option60 = 60,
	Option120 = 120,
}

enum WordsOptions {
	Option10 = 10,
	Option25 = 25,
	Option50 = 50,
	Option100 = 100,
}

type TimeMode = {
	type: 'time';
	options: TimeOptions[];
};

type WordsMode = {
	type: 'words';
	options: WordsOptions[];
};

export type TestMode = TimeMode | WordsMode;
export type TestOption = TimeOptions | WordsOptions;

export const modes: TestMode[] = [
	{
		type: 'time',
		options: [
			TimeOptions.Option15,
			TimeOptions.Option30,
			TimeOptions.Option60,
			TimeOptions.Option120,
		],
	},
	{
		type: 'words',
		options: [
			WordsOptions.Option10,
			WordsOptions.Option25,
			WordsOptions.Option50,
			WordsOptions.Option100,
		],
	},
];
