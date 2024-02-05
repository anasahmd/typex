import { Fragment } from 'react';
import { modes } from '../utils/modes';

const ModeSelector = ({
	testMode,
	setTestMode,
}: {
	testMode: number[];
	setTestMode: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
	return (
		<div className="flex mt-40 max-w-[900px] mx-auto text-xl justify-between flex-col sm:flex-row">
			<div className="flex gap-4">
				{modes.map((mode, index) => (
					<span
						className={
							` px-4 py-2 rounded-2xl cursor-pointer ` +
							(testMode[0] === index ? 'bg-cyan-400' : 'bg-white')
						}
						onClick={() => {
							setTestMode([index, 1]);
						}}
						key={index}
					>
						{mode.type}
					</span>
				))}
			</div>
			<div className="flex gap-4">
				{modes.map((mode, modeIndex) => (
					<Fragment key={modeIndex}>
						{testMode[0] === modeIndex &&
							mode.options.map((option, optionIndex) => (
								<span
									className={
										` px-4 py-2 rounded-2xl cursor-pointer ` +
										(testMode[1] === optionIndex ? 'bg-cyan-400' : 'bg-white')
									}
									onClick={() => {
										setTestMode([modeIndex, optionIndex]);
									}}
									key={optionIndex}
								>
									{option}
								</span>
							))}
					</Fragment>
				))}
			</div>
		</div>
	);
};

export default ModeSelector;
