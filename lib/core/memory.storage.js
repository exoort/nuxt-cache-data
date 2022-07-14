const isFunction = value => value && (Object.prototype.toString.call(value) === '[object Function]' || typeof value === 'function' || value instanceof Function)

const parseItemKey = (itemKey) => {
  const keyIsString = typeof itemKey === 'string'

  const key = keyIsString ? itemKey : itemKey.key
  const secret = !keyIsString ? (itemKey?.secret || null) : null

  return {
    key,
    secret
  }
}

/**
 *  Get cached data from memory on server side
 * @returns {({ disabled: boolean, writeEmpty: boolean }) => DataCache}
 */
export function memoryStorage () {
  const cache = {}

  /**
   * @param {ModuleOptions} config
   * @returns {DataCache}
   */
  return config => ({
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
      if (!config?.writeEmpty && !value) {
        return Promise.resolve(false)
      }

      const itemKey = parseItemKey(key)
      const time = new Date().getTime() + seconds * 1000

      cache[itemKey.key] = {
        value: JSON.stringify(value),
        time,
        secret: itemKey.secret
      }

      return Promise.resolve(true)
    },

    async get (key) {
      const itemKey = parseItemKey(key)

      const cached = cache[itemKey.key]

      if (!cached || itemKey.secret !== cached.secret) {
        return null
      }

      const now = Date.now()

      if (now > cached?.time) {
        await this.remove(key)

        return null
      }

      return JSON.parse(cached.value)
    },

    remove (key) {
      const itemKey = parseItemKey(key)

      if (cache[itemKey.key] && itemKey.secret === cache[itemKey.key].secret) {
        delete cache[itemKey.key]
        return Promise.resolve(true)
      }

      return Promise.resolve(false)
    },

    getAll () {
      return Promise.resolve(JSON.parse(JSON.stringify(cache)))
    }
  })
}
