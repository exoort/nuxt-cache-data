const isFunction = value => value && (Object.prototype.toString.call(value) === '[object Function]' || typeof value === 'function' || value instanceof Function)

/**
 *  Get cached data from memory on server side
 * @returns {() => IDataCache}
 */
export function memoryStorage () {
  const cache = {}

  /**
   * @returns {IDataCache}
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

          this.set(key, data, seconds)
        }

        return data
      },

      set (key, value, seconds = 60) {
        const time = new Date().getTime() + seconds * 1000

        cache[key] = {
          value: JSON.parse(JSON.stringify(value)),
          time
        }

        return true
      },

      get (key) {
        return new Promise((resolve) => {
          const cached = cache[key]
          const now = new Date().getTime()

          if (!cached) {
            resolve(null)
          }

          if (now > cached?.time) {
            this.remove(key)

            resolve(null)
          }

          resolve(cached.value)
        })
      },

      remove (key) {
        if (cache[key]) {
          delete cache[key]
        }
        return false
      }
    }
  }
}
