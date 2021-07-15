export function debunce (fn, delay) {
  var timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

export function throttle (fn, delay) {
  var timer
  return function () {
    if (timer) {
      fn.apply(this, arguments)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}
