import { extractKeys } from '../../client/utils';

describe('utils', () => {
  describe('extractKeys', () => {
    it('should produce an empty set if template contains no keys', () => {
      const template = 'template string with no keys';
      const keys = extractKeys(template);
      const expected = new Set([]);
      expect(keys).toEqual(expected);
    });

    it('should produce an empty set if template is an empty string', () => {
      const template = '';
      const keys = extractKeys(template);
      const expected = new Set([]);
      expect(keys).toEqual(expected);
    });

    it('should produce a unique set of keys if template lists a key twice', () => {
      const template = 'template %%key1%% string %%key2%% with keys %%key1%%';
      const keys = extractKeys(template);
      const expected = new Set(['key1', 'key2']);
      expect(keys).toEqual(expected);
    });
  });
});
