const isFunction = value => value && (Object.prototype.toString.call(value) === '[object Function]' || typeof value === 'function' || value instanceof Function)

/**
 *  Get cached data from memory on server side
 * @returns {() => DataCache}
 */
export function memoryStorage () {
  const cache = {}

  /**
   * @returns {DataCache}
   */
  return function () {
    return {
      async fetch (key, dataSource, seconds = 60) {
        let data = await this.get(key)

        if (!data && dataSource) {
          if (isFunction(dataSource)) {
            data = await dataSource()
          } else {
            data = dataSource
          }

          await this.set(key, data, seconds)
        }

        return data
      },

      set (key, value, seconds = 60) {
        const time = new Date().getTime() + seconds * 1000

        cache[key] = {
          value: JSON.stringify(value),
          time
        }

        return Promise.resolve(true)
      },

      async get (key) {
        const cached = cache[key]
        const now = Date.now()

        if (!cached) {
          return null
        }

        if (now > cached?.time) {
          await this.remove(key)

          return null
        }

        return JSON.parse(cached.value)
      },

      remove (key) {
        if (cache[key]) {
          delete cache[key]
          return Promise.resolve(true)
        }

        return Promise.resolve(false)
      }
    }
  }
}
