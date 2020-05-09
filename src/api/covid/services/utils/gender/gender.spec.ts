import { genderGroup } from './gender';

import mocks from './mocks.json';

describe('Gender', () => {
	it('should get the data grouped by gender', () => {
		expect(genderGroup(mocks)).toHaveLength(2);
	});
});
