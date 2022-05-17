/**
 *
 * @param {DataCache} storage
 * @returns {DataCache}
 */
export default function cacheProvider (storage) {
  return {
    fetch (...args) {
      return storage.fetch(...args)
    },
    set (...args) {
      return storage.set(...args)
    },
    get (...args) {
      return storage.get(...args)
    },
    remove (...args) {
      return storage.remove(...args)
    }
  }
}
