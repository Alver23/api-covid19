import { Covid } from './covid';

// Mocks
import * as mocks from './mocks.json';

describe('Covid Model', () => {
  it('should get an model of covid', () => {
    expect(new Covid(mocks.request as any)).toEqual(mocks.response);
  });
});
