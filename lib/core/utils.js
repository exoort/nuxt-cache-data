export const parseItemKey = (itemKey) => {
  const keyIsString = typeof itemKey === 'string'

  const key = keyIsString ? itemKey : itemKey.key
  const secret = !keyIsString ? itemKey.secret : null

  return {
    key,
    secret
  }
}

function sizeOfObject (object) {
  const objectList = []
  const stack = [object]
  const bytes = [0]
  while (stack.length) {
    const value = stack.pop()
    if (value == null) { bytes[0] += 4 } else if (typeof value === 'boolean') { bytes[0] += 4 } else if (typeof value === 'string') { bytes[0] += value.length * 2 } else if (typeof value === 'number') { bytes[0] += 8 } else if (typeof value === 'object' && !objectList.includes(value)) {
      objectList.push(value)
      if (typeof value.byteLength === 'number') { bytes[0] += value.byteLength } else if (value[Symbol.iterator]) {
        // eslint-disable-next-line no-restricted-syntax
        for (const v of value) { stack.push(v) }
      } else {
        Object.keys(value).forEach((k) => {
          bytes[0] += k.length * 2; stack.push(value[k])
        })
      }
    }
  }
  return bytes[0]
}

function shortenBytes (n) {
  const k = n > 0 ? Math.floor((Math.log2(n) / 10)) : 0
  const rank = (k > 0 ? 'KMGT'[k - 1] : '') + 'b'
  const count = Math.floor(n / Math.pow(1024, k))
  return `${count} ${rank}`
}

export function getSizeOfObject (object) {
  return shortenBytes(sizeOfObject(object))
}
