export const genderGroup = items => {
	const GENDERS = {
		m: 'Masculino',
		f: 'Femenino',
		M: 'Masculino',
		F: 'Femenino',
	};
	let result = [];

	items.forEach(item => {
		const gender = GENDERS[item.name];
		const genderFiltered = result.find(item => item.name === gender);
		if (!genderFiltered) {
			result = [...result, { name: gender, total: +item.total }];
		} else {
			const index = result.findIndex(item => item.name === gender);
			result.splice(index, 1);
			const { name, total } = genderFiltered;
			result = [...result, { name, total: +item.total + +total }];
		}
	});
	return result;
};
