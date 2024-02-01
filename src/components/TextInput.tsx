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
				className=" px-4 py-2 rounded-2xl text-lg disabled:bg-white disabled:cursor-not-allowed"
				type="text"
				value={inputText}
				onChange={(e) => onKeyPress(e)}
				disabled={isDisabled}
			/>
		</>
	);
};

export default TextInput;
