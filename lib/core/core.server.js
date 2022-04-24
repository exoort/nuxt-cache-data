import path from 'path'
import fs from 'fs'
/**
 * data cache module for server side
 * @returns {IDataCache}
 */
export function dataCache () {
  const fsAsync = fs.promises

  const pathToStaticFolder = () => {
    const __dirname = path.resolve()
    return path.join(__dirname, 'static/cache')
  }

  const pathToFile = (key) => {
    return path.join(pathToStaticFolder(), `${key}.json`)
  }

  return {
    async set (key, data) {
      const pathToFolder = pathToStaticFolder()
      if (!fs.existsSync(pathToFolder)) {
        await fsAsync.mkdir(pathToFolder, { recursive: true }).catch((err) => {
          // decide what you want to do if this failed
          console.error(err)
        })
      }

      console.log(pathToFile(key))
      try {
        await fsAsync.writeFile(
          pathToFile(key),
          JSON.stringify(data)
        )

        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },

    async get (key) {
      if (!fs.existsSync(pathToFile(key))) {
        return null
      }

      try {
        const rawData = await fsAsync.readFile(pathToFile(key), 'utf8')

        if (!rawData) {
          return null
        }

        return JSON.parse(rawData)
      } catch (e) {
        return null
      }
    },

    async remove (key) {
      if (!fs.existsSync(pathToFile(key))) {
        return false
      }

      try {
        await fsAsync.unlink(pathToFile(key))
        return true
      } catch (e) {
        return false
      }
    }
  }
}
