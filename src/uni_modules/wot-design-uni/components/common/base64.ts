const _b64chars = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/']
const _mkUriSafe = (src) => src.replace(/[+/]/g, (m0) => (m0 === '+' ? '-' : '_')).replace(/=+$/m, '')
const fromUint8Array = (src, rfc4648 = false) => {
  let b64 = ''
  for (let i = 0, l = src.length; i < l; i += 3) {
    const [a0, a1, a2] = [src[i], src[i + 1], src[i + 2]]
    const ord = (a0 << 16) | (a1 << 8) | a2
    b64 += _b64chars[ord >>> 18]
    b64 += _b64chars[(ord >>> 12) & 63]
    b64 += typeof a1 !== 'undefined' ? _b64chars[(ord >>> 6) & 63] : '='
    b64 += typeof a2 !== 'undefined' ? _b64chars[ord & 63] : '='
  }
  return rfc4648 ? _mkUriSafe(b64) : b64
}
const _btoa =
  typeof btoa === 'function'
    ? (s) => btoa(s)
    : (s) => {
        if (s.charCodeAt() > 255) {
          throw new RangeError('The string contains invalid characters.')
        }
        return fromUint8Array(Uint8Array.from(s, (c: any) => c.charCodeAt(0)))
      }
const utob = (src) => unescape(encodeURIComponent(src))

export default function encode(src, rfc4648 = false) {
  const b64 = _btoa(utob(src))
  return rfc4648 ? _mkUriSafe(b64) : b64
}
