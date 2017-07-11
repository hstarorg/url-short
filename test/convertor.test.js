const convertor = require('../src/common/convertor');

test('test int to str', () => {
  expect(convertor.int2str(61)).toBe('aaaa0');

  expect(convertor.int2str(0)).toBe('aaaaa');

  expect(convertor.int2str(916132831)).toBe('00000');
});

test('test str to int', () => {
  expect(convertor.str2int('aaaa0')).toBe(61);

  expect(convertor.str2int('aaaaa')).toBe(0);

  expect(convertor.str2int('00000')).toBe(916132831);
});

