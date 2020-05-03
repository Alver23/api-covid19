import { uriParser } from './uri-parser';

describe('uriParser', () => {
  it('should generate an url with query params', () => {
    const queryParams = [
      { name: 'field', value: 'city' },
      { name: 'value', value: 100 },
    ];
    expect(uriParser(queryParams)).toEqual('field=city&value=100');
  });

  it('should return an string empty when no send parameter', () => {
    expect(uriParser(null)).toBeFalsy();
  });
});
