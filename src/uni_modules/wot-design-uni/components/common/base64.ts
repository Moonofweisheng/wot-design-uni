const _b64chars: string[] = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/']
const _mkUriSafe = (src: string): string => src.replace(/[+/]/g, (m0: string) => (m0 === '+' ? '-' : '_')).replace(/=+\$/m, '')
const fromUint8Array = (src: Uint8Array, rfc4648 = false): string => {
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
const _btoa: (s: string) => string =
  typeof btoa === 'function'
    ? (s: string) => btoa(s)
    : (s: string) => {
        if (s.charCodeAt(0) > 255) {
          throw new RangeError('The string contains invalid characters.')
        }
        return fromUint8Array(Uint8Array.from(s, (c: string) => c.charCodeAt(0)))
      }
const utob = (src: string): string => unescape(encodeURIComponent(src))

export default function encode(src: string, rfc4648 = false): string {
  const b64 = _btoa(utob(src))
  return rfc4648 ? _mkUriSafe(b64) : b64
}
