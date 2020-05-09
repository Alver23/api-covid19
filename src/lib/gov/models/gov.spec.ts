import { Gov } from './gov';

// Mocks
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as mocks from './mocks.json';

describe('Covid Model', () => {
	it('should get an model of covid', () => {
		expect(new Gov(mocks.request as any)).toEqual(mocks.response);
	});
});
