import React from 'react';

const ModeSelector = ({
	setTestDuration,
}: {
	setTestDuration: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="flex gap-4 mt-20 max-w-[800px] mx-auto justify-end">
			<span
				className="bg-white px-4 py-2 rounded-2xl cursor-pointer"
				onClick={() => {
					setTestDuration(15);
				}}
			>
				0:15
			</span>
			<span
				className="bg-white px-4 py-2 rounded-2xl cursor-pointer"
				onClick={() => {
					setTestDuration(30);
				}}
			>
				0:30
			</span>
			<span
				className="bg-white px-4 py-2 rounded-2xl cursor-pointer"
				onClick={() => {
					setTestDuration(60);
				}}
			>
				1:00
			</span>
			<span
				className="bg-white px-4 py-2 rounded-2xl cursor-pointer"
				onClick={() => {
					setTestDuration(120);
				}}
			>
				2:00
			</span>
		</div>
	);
};

export default ModeSelector;
