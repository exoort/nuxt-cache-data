/**
 * Mock service for compatibility when service is disabled
 * @returns {IDataCache}
 */
export function mockStorage () {
  return {
    async fetch (key, dataSource, seconds = 60) {
      return await dataSource()
    },

    set (key, value, seconds = 60) {
      // eslint-disable-next-line no-console
      console.error("You can't set cache on disabled service")
      return Promise.resolve(false)
    },

    get (key) {
      // eslint-disable-next-line no-console
      console.error("You can't get cache on disabled service")
      return Promise.resolve(null)
    },

    remove (key) {
      // eslint-disable-next-line no-console
      console.error("You can't remove cache on disabled service")
      return Promise.resolve(false)
    }
  }
}
