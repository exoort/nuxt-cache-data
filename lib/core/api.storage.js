import { parseItemKey } from './utils'

function actuateCache (actuationState) {
  if (actuationState.value) {
    return
  }

  actuationState.value = window.location.href

  setTimeout(() => {
    const newFullUrl = window.location.href

    if (newFullUrl === actuationState.value) {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', newFullUrl, true)
      xhr.send(null)
    }
    actuationState.value = null
  }, 3000)
}

/**
 *  Get cached data from api on client side
 * @returns {DataCache}
 */
export function apiStorage () {
  const actuationState = {
    value: false
  }

  return {
    async fetch (key, dataSource, seconds = 60) {
      let data = await this.get(key)

      if (!data) {
        actuateCache(actuationState)

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
      const itemKey = parseItemKey(key)

      try {
        const host = `${location.protocol}//${location.hostname}${location.port ? ':' + location.port : ''}`

        const searchParams = new URLSearchParams({
          key: itemKey.key,
          salt: Date.now()
        })

        if (itemKey.secret) {
          searchParams.set('secret', itemKey.secret)
        }

        const response = await window.fetch(`${host}/cache-api/get?${searchParams.toString()}`, {
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
    },

    getAll () {
      // eslint-disable-next-line no-console
      console.error("You can't get all cache on client")
      return Promise.resolve({})
    }
  }
}
