import { build } from '../src/commands/build';

describe('build', () => {
    test('has build function', () => {
        expect(typeof build).toBe('function');
      })
});
