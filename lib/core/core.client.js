/**
 * data cache module for client side
 * @returns {IDataCache}
 */
export function dataCache () {
  const pathToFile = key => `${window.location.host}/static/cache/${key}.json`

  return {
    set () {
      return Promise.resolve(false)
    },

    async get (key) {
      try {
        const response = await window.fetch(pathToFile(key))
        return response.json()
      } catch (e) {
        return null
      }
    },

    remove () {
      return Promise.resolve(false)
    }
  }
}
