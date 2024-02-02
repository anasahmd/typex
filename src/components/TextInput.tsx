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
				className="w-full px-4 py-4 rounded-2xl text-2xl disabled:bg-white disabled:cursor-not-allowed"
				type="text"
				value={inputText}
				onChange={(e) => onKeyPress(e)}
				disabled={isDisabled}
			/>
		</>
	);
};

export default TextInput;
