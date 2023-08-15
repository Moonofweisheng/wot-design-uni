/**
 * Minified by jsDelivr using Terser v5.14.1.
 * Original file: /npm/@vant/touch-emulator@1.4.0/dist/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!(function () {
  if ('undefined' != typeof window) {
    var e,
      t = 'ontouchstart' in window
    document.createTouch ||
      (document.createTouch = function (e, t, o, u, c, i, r) {
        return new n(t, o, { pageX: u, pageY: c, screenX: i, screenY: r, clientX: u - window.pageXOffset, clientY: c - window.pageYOffset }, 0, 0)
      }),
      document.createTouchList ||
        (document.createTouchList = function () {
          for (var e = u(), t = 0; t < arguments.length; t++) e[t] = arguments[t]
          return (e.length = arguments.length), e
        }),
      Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
      Element.prototype.closest ||
        (Element.prototype.closest = function (e) {
          var t = this
          do {
            if (t.matches(e)) return t
            t = t.parentElement || t.parentNode
          } while (null !== t && 1 === t.nodeType)
          return null
        })
    var n = function (e, t, n, o, u) {
        ;(o = o || 0),
          (u = u || 0),
          (this.identifier = t),
          (this.target = e),
          (this.clientX = n.clientX + o),
          (this.clientY = n.clientY + u),
          (this.screenX = n.screenX + o),
          (this.screenY = n.screenY + u),
          (this.pageX = n.pageX + o),
          (this.pageY = n.pageY + u)
      },
      o = !1
    ;(s.multiTouchOffset = 75), t || new s()
  }
  function u() {
    var e = []
    return (
      (e.item = function (e) {
        return this[e] || null
      }),
      (e.identifiedTouch = function (e) {
        return this[e + 1] || null
      }),
      e
    )
  }
  function c(t) {
    return function (n) {
      var u, c, s
      ;('mousedown' === n.type && (o = !0), 'mouseup' === n.type && (o = !1), 'mousemove' !== n.type || o) &&
        (('mousedown' === n.type || !e || (e && !e.dispatchEvent)) && (e = n.target),
        null == e.closest('[data-no-touch-simulate]') &&
          ((u = t),
          (c = n),
          (s = document.createEvent('Event')).initEvent(u, !0, !0),
          (s.altKey = c.altKey),
          (s.ctrlKey = c.ctrlKey),
          (s.metaKey = c.metaKey),
          (s.shiftKey = c.shiftKey),
          (s.touches = r(c)),
          (s.targetTouches = r(c)),
          (s.changedTouches = i(c)),
          e.dispatchEvent(s)),
        'mouseup' === n.type && (e = null))
    }
  }
  function i(t) {
    var o = u()
    return o.push(new n(e, 1, t, 0, 0)), o
  }
  function r(e) {
    return 'mouseup' === e.type ? u() : i(e)
  }
  function s() {
    window.addEventListener('mousedown', c('touchstart'), !0),
      window.addEventListener('mousemove', c('touchmove'), !0),
      window.addEventListener('mouseup', c('touchend'), !0)
  }
})()
//# sourceMappingURL=/sm/09d4343b52fa585c57a1a2c7344e01acc2c39070e2053d5939820b8f1140409d.map
