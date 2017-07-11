const db = require('../src/common/db');

test('test get next id', async () => {
  let firstId = await db.getNextId();
  for (let i = firstId + 1; i < firstId + 100; i++) {
    expect(await db.getNextId()).toBe(i);
  }
});
