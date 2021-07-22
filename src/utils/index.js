export function debunce (fn, delay = 50) {
  var timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export function throttle (fn, delay = 50) {
  var timer
  return function (...args) {
    if (!timer) {
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}

export function flattenTree (data) {
  let key = 0
  function flat (data, parent) {
    return data.reduce((obj, current) => {
      current.key = key
      obj[key] = {
        parent,
        node: current
      }
      key++
      if (current.children) {
        obj = { ...obj, ...flat(current.children, current) }
      }
      return obj
    }, {})
  }
  return flat(data)
}
