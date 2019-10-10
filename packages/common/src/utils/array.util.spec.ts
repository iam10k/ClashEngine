import { ArrayUtil } from './array.util';

describe('ArrayUtil', () => {
  it('isEmpty should return true on empty', () => {
    expect(ArrayUtil.isEmpty([])).toBeTruthy();
    expect(ArrayUtil.isEmpty(null)).toBeTruthy();
    expect(ArrayUtil.isEmpty(undefined)).toBeTruthy();
  });

  it('isEmpty should return false on not empty', () => {
    expect(ArrayUtil.isEmpty([''])).toBeFalsy();
    expect(ArrayUtil.isEmpty(['a'])).toBeFalsy();
  });
});
