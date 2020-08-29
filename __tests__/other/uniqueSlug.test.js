const uniqueSlug = require('../../utils/uniqueSlug')
const UniqueSlugMock = require('../../__mocks__/uniqueSlug.mocks')

describe(`[UNIQUE SLUG] FUNCTIONS`, function () {
  describe(`INCREMENTAL SLUG`, function () {
    const correctSlug = {
      name: 'Mock event',
      slug: 'mock-event-3'
    }

    test(`[INCREMENT SLUG] should return correctSlug object`, () => {
      const name = 'Mock event    '
      const slug = 'mock-event'
      return uniqueSlug(name, slug, UniqueSlugMock).then((newSlug) => {
        expect(newSlug).toStrictEqual(correctSlug);
      });
    });

    test(`[EMPTY SLUG] should return correctSlug object`, () => {
      const name = 'Mock event'
      return uniqueSlug(name, false, UniqueSlugMock).then((newSlug) => {
        expect(newSlug).toStrictEqual(correctSlug);
      });
    });
  });
});