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
		<div className="flex mt-12 gap-4 sm:mt-24 w-full max-w-[900px] mx-auto sm:text-xl justify-between flex-col sm:flex-row">
			<div className="flex gap-4">
				{modes.map((mode, index) => (
					<span
						className={
							` px-4 py-2 rounded-2xl cursor-pointer ` +
							(testMode[0] === index
								? 'bg-slate-800 text-white dark:bg-slate-700'
								: 'bg-white dark:bg-gray-800')
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
										(testMode[1] === optionIndex
											? 'bg-slate-800 text-white dark:bg-slate-700'
											: 'bg-white dark:bg-gray-800')
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
