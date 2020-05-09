const calculateRange = (age: number): string => {
	const RANGES = ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-99', '100'];
	let range;
	RANGES.forEach(item => {
		const [i, k] = item.split('-');
		if (i && k) {
			if (age >= +i && age <= +k) {
				range = item;
			}
		} else {
			if (age >= +i) {
				range = `+${i}`;
			}
		}
	});

	return range;
};

export const ageRange = items => {
	let result = [];
	items.forEach(items => {
		const { name, total } = items;
		const range = calculateRange(+name);
		const rangeFiltered = result.find(item => item.range === range);
		if (!rangeFiltered) {
			result = [...result, { range, total: +total }];
		} else {
			const index = result.findIndex(item => item.range === range);
			result.splice(index, 1);
			const { range: rangeF, total: totalRange } = rangeFiltered;
			result = [...result, { range: rangeF, total: +total + +totalRange }];
		}
	});
	return result;
};
