import { ageRange } from './age';

import mocks from './mocks.json';

describe('Age Range', () => {
	it('should return age range', () => {
		const result = ageRange(mocks);
		expect(result).toHaveLength(4);
	});
});
