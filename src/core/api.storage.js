/**
 *  Get cached data from api on client side
 * @returns {IDataCache}
 */
export function apiStorage () {
  return {
    async fetch (key, dataSource, seconds = 60) {
      let data = await this.get(key)

      if (!data) {
        data = await dataSource()
      }

      return data
    },

    set (key, value, seconds = 60) {
      // eslint-disable-next-line no-console
      console.error("You can't set cache on client")
      return Promise.resolve(false)
    },

    async get (key) {
      try {
        const host = `${location.protocol}//${location.hostname}${location.port ? ':' + location.port : ''}`
        const salt = new Date().getTime()
        const response = await window.fetch(`${host}/cache-api/get?key=${key}&salt=${salt}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return response.json()
      } catch (e) {
        return null
      }
    },

    remove (key) {
      // eslint-disable-next-line no-console
      console.error("You can't remove cache on client")
      return Promise.resolve(false)
    }
  }
}
