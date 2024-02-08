import { ChangeEvent } from 'react';

const TextInput = ({
	inputText,
	onKeyPress,
	isDisabled,
}: {
	inputText: string;
	onKeyPress: (e: ChangeEvent<HTMLInputElement>) => void;
	isDisabled: boolean;
}) => {
	return (
		<>
			<input
				className="w-full p-3 sm:p-4 rounded-2xl text-lg sm:text-2xl disabled:bg-white disabled:cursor-not-allowed dark:bg-gray-800"
				type="text"
				value={inputText}
				onChange={(e) => onKeyPress(e)}
				disabled={isDisabled}
				autoCapitalize="none"
			/>
		</>
	);
};

export default TextInput;
