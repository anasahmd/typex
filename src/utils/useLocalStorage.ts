import { useEffect, useState } from 'react';

const getSavedValue = (key: string, initialValue: number[]) => {
	const data = localStorage.getItem(key);

	if (data) return JSON.parse(data);

	return initialValue;
};

export const useLocalStorage = (key: string, initialValue: number[]) => {
	const [value, setValue] = useState(() => getSavedValue(key, initialValue));

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};
